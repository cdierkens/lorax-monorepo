from fastapi import FastAPI, Response
from lorax import Client
from fastapi_cache import FastAPICache
from fastapi_cache.decorator import cache

import concurrent.futures as concurrency

from pydantic import BaseModel

app = FastAPI()


class LoraxResponse(BaseModel):
    prompt: str
    textA: str
    textB: str


def generate(
    prompt: str,
    base_model: str,
    adapter: str | None,
    temperature: float,
    max_new_tokens: int,
):

    print(f"Generating for model: {base_model} ,adapter: {adapter}")

    client = Client(
        base_url=f"https://serving.app.predibase.com/6dcb0c/deployments/v2/llms/{base_model}",
        headers={"Authorization": "Bearer pb_VUEyEdt4WTCpn4Z3G_o3dQ"},
    )

    return client.generate(
        prompt,
        max_new_tokens=max_new_tokens,
        temperature=temperature,
        adapter_id=adapter,
    )


# TODO: Use a union type for base_model. This will allow us to specify the possible values for the base_model parameter.


@app.get("/")
def read_root(
    prompt: str,
    base_modelA: str,
    temperatureA: float,
    max_new_tokensA: int,
    base_modelB: str,
    temperatureB: float,
    max_new_tokensB: int,
    response: Response,
    adapterB: str | None = None,
    adapterA: str | None = None,
) -> LoraxResponse:
    adapterA = None if adapterA == "None" else adapterA
    adapterB = None if adapterB == "None" else adapterB

    pool = concurrency.ThreadPoolExecutor(max_workers=2)

    print(
        f"Prompt: {prompt}, {base_modelA}, {adapterA}, {temperatureA}, {max_new_tokensA}"
    )
    print(
        f"Prompt: {prompt}, {base_modelB}, {adapterB}, {temperatureB}, {max_new_tokensB}"
    )

    responseA = pool.submit(
        generate, prompt, base_modelA, adapterA, temperatureA, max_new_tokensA
    )
    responseB = pool.submit(
        generate, prompt, base_modelB, adapterB, temperatureB, max_new_tokensB
    )

    pool.shutdown(wait=True)

    """
      Let the browser cache the response for 60 seconds. Letting the browser do
      what's it's good at!

      This cache is pretty naive though. It will cache the response for 60 seconds
      on EACH client separately.

      When we go to production we would want to examine:
       1. Are we serving on 1 long running compute instance. If so, we can use a
          an in memory cache.
       2. Are we serving on multiple instances. If so, we can use a distributed
          cache like Redis.
       3. Are we expecting to cache post requests (ie: use the body to compute the
          cache key.) If not, we can look at out of the box CDN options that are really
          good at caching GET requests (note some CDNs do have the option to use the body
          of a request like CloudFlare).
    """
    response.headers["Cache-Control"] = "max-age=60"
    return {
        "prompt": prompt,
        "textA": responseA.result().generated_text,
        "textB": responseB.result().generated_text,
    }
