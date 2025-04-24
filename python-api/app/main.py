from fastapi import FastAPI
from typing import Optional
from .promocodes import add_promo, get_promo_by_code, delete_promo, update_promo, Promo

app = FastAPI()

@app.post("/promocodes/")
async def create_promo(promo: Promo):
    # Попытка добавить промокод
    success = add_promo(promo)
    if success:
        return {"message": "Promo created successfully!"}
    else:
        return {"message": "Failed to create promo."}

@app.get("/promocodes/{code}")
async def read_promo(code: str):
    # Получение промокода по коду
    promo = get_promo_by_code(code)
    if promo:
        return promo
    return {"message": "Promo not found."}

@app.delete("/promocodes/{code}")
async def remove_promo(code: str):
    # Попытка удалить промокод
    success = delete_promo(code)
    if success:
        return {"message": "Promo deleted successfully!"}
    return {"message": "Promo not found."}

@app.put("/promocodes/{code}")
async def update_promo_info(code: str, promo: Promo):
    # Попытка обновить информацию о промокоде
    success = update_promo(code, promo)
    if success:
        return {"message": "Promo updated successfully!"}
    return {"message": "Promo not found."}