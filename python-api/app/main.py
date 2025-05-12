from fastapi import FastAPI, status
from fastapi.responses import JSONResponse
from typing import Optional
from promocodes import add_promo, get_promo_by_code, delete_promo, update_promo, Promo
from fastapi.middleware.cors import CORSMiddleware



app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Разрешить любые источники (подойдёт для локальной разработки)
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/promocodes/", status_code=status.HTTP_201_CREATED)
async def create_promo(promo: Promo):
    try:
        add_promo(promo)
        return {"message": "Promo created successfully!"}
    except Exception as e:
        return JSONResponse(status_code=status.HTTP_400_BAD_REQUEST, content={"message": str(e)})

@app.get("/promocodes/{code}")
async def read_promo(code: str):
    promo = get_promo_by_code(code)
    if promo:
        return promo
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "Promo not found."})

@app.delete("/promocodes/{code}")
async def remove_promo(code: str):
    # Попытка удалить промокод
    success = delete_promo(code)
    if success:
        return {"message": "Promo deleted successfully!"}
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "Promo not found."})

@app.put("/promocodes/{code}")
async def update_promo_info(code: str, promo: Promo):
    # Попытка обновить информацию о промокоде
    success = update_promo(code, promo)
    if success:
        return {"message": "Promo updated successfully!"}
    return JSONResponse(status_code=status.HTTP_404_NOT_FOUND, content={"message": "Promo not found."})