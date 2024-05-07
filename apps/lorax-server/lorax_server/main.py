from fastapi import FastAPI
from lorax import Client

client = Client(
    base_url="https://serving.app.predibase.com/6dcb0c/deployments/v2/llms/mistral-7b-instruct-dedicated",
    headers={"Authorization": "Bearer pb_VUEyEdt4WTCpn4Z3G_o3dQ"},
)

app = FastAPI()


@app.get("/")
def read_root():
    prompt = "What is your name?"
    text = client.generate(prompt, max_new_tokens=20, temperature=0.1).generated_text

    return {prompt: "What is your name?", "text": text}
