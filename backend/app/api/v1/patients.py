from fastapi import APIRouter, HTTPException
from typing import List
from supabase import create_client
from app.schemas.patient import Patient
import os
from dotenv import load_dotenv

load_dotenv()

SUPABASE_URL = os.getenv("SUPABASE_URL")
SUPABASE_KEY = os.getenv("SUPABASE_KEY")
supabase = create_client(SUPABASE_URL, SUPABASE_KEY)

router = APIRouter(
    prefix="/patients",  # 👈 clean prefix
    tags=["Patients"]        # 👈 shows up nicely in Swagger
)

@router.get("/", response_model=List[Patient])
def get_patients():
    try:
        response = supabase.table("patients").select("*").execute()
        return response.data
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
