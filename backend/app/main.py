# Entry point for FastAPI
from fastapi import FastAPI
from app.api.v1 import patients

app = FastAPI(
    title="AarogyaDesk API",
    version="1.0.0")


# You will plug your API routes here ⬇️
app.include_router(patients.router, prefix="/api/v1")