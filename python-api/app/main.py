from fastapi import FastAPI
from app.promocodes import router as promocode_router

app = FastAPI(
    title="PromoCode API",
    description="API для управления промокодами",
    version="1.0.0"
)

# Регистрируем промо-роуты
app.include_router(promocode_router, prefix="/promocode", tags=["Promocodes"])

@app.get("/")
def root():
    return {"message": "API запущен и работает!"}