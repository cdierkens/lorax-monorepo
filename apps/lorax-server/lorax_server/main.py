from fastapi import FastAPI
from lorax import Client
from pydantic import BaseModel

client = Client(
    base_url="https://serving.app.predibase.com/6dcb0c/deployments/v2/llms/mistral-7b-instruct-dedicated",
    headers={"Authorization": "Bearer pb_VUEyEdt4WTCpn4Z3G_o3dQ"},
)

app = FastAPI()


class Response(BaseModel):
    text: str


@app.get("/")
def read_root(prompt: str) -> Response:
    text = client.generate(prompt, max_new_tokens=20, temperature=0.1).generated_text

    return {"text": text}
