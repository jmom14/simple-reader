from fastapi import FastAPI
from dotenv import load_dotenv
import httpx
from fastapi.responses import RedirectResponse, JSONResponse
import os 

load_dotenv()

app = FastAPI()

AUTH_URL = os.environ.get('AUTH_URL')
GOOGLE_CLIENT_ID = os.environ.get('GOOGLE_CLIENT_ID')
REDIRECT_URI = os.environ.get('REDIRECT_URI')
GOOGLE_CLIENT_SECRET = os.environ.get('GOOGLE_CLIENT_SECRET')
TOKEN_URL = os.environ.get('TOKEN_URL')
USERINFO_URL = os.environ.get('USERINFO_URL')

@app.get("/")
async def root():
    return {"message": "Hello World"}

@app.get("/login")
async def login():
    authorization_url = (
        f"{AUTH_URL}?client_id={GOOGLE_CLIENT_ID}&redirect_uri={REDIRECT_URI}&scope=email&response_type=code"
    )
    print('authorization_url: ', authorization_url)
    return RedirectResponse(authorization_url)

@app.get("/login/callback")
async def login_callback(code: str, scope: str):
    token_params = {
        "code": code,
        "client_id": GOOGLE_CLIENT_ID,
        "client_secret": GOOGLE_CLIENT_SECRET,
        "redirect_uri": REDIRECT_URI,
        "grant_type": "authorization_code",
    }

    async with httpx.AsyncClient() as client:
        token_response = await client.post(TOKEN_URL, data=token_params)

    token_data = token_response.json()
    access_token = token_data["access_token"]

    async with httpx.AsyncClient() as client:
        user_response = await client.get(
            USERINFO_URL, headers={"Authorization": f"Bearer {access_token}"}
        )
    user_info = user_response.json()

    # Handle user authentication and authorization logic here using user_info
    # {"user_info": user_info}
    # redirect_url = 'http://localhost:3000?' + json_to_params()
    # return RedirectResponse(url=)
    return JSONResponse(content=user_info)



if __name__ == "__main__":
    import uvicorn

    uvicorn.run(app, host="127.0.0.1", port=8000)