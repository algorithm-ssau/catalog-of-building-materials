import json
from fastapi import HTTPException
from typing import List, Optional
from pydantic import BaseModel
from pathlib import Path
from datetime import date

DEFAULT_PROMO_FILE = Path('promocodes.json')

# Модель промокода
class Promo(BaseModel):
    code: str
    valid_until: Optional[date] = None  # Дата действия необязательная
    uses_left: Optional[int] = None     # Количество активаций необязательное
    discount_percent: float
    applicable_items: Optional[List[str]] = []  # Список товаров необязателен

    class Config:
        use_enum_values = True

# Функция для сериализации объекта типа date в строку
def date_converter(obj):
    if isinstance(obj, date):
        return obj.isoformat()  # Преобразует дату в строку в формате YYYY-MM-DD
    raise TypeError(f"Type {obj.__class__.__name__} not serializable")

# Функция для загрузки промокодов из файла
def load_promos(file_path: Path = DEFAULT_PROMO_FILE) -> List[Promo]:
    try:
        with open(file_path, 'r') as file:
            data = json.load(file)
        return [Promo(**item) for item in data]
    except (FileNotFoundError, json.JSONDecodeError):
        return []  # Если файл не найден или есть ошибка в формате, возвращаем пустой список

# Функция для записи промокодов в файл
def save_promos(promos, file_path: Path = DEFAULT_PROMO_FILE):
    try:
        with open(file_path, "w") as file:
            json.dump([promo.dict() for promo in promos], file, indent=4, default=date_converter)
    except IOError as e:
        print(f"Error saving file: {e}")

# Функция для добавления нового промокода
def add_promo(promo: Promo, file_path: Path = DEFAULT_PROMO_FILE) -> bool:
    promos = load_promos(file_path)
    if any(existing_promo.code == promo.code for existing_promo in promos):
        raise HTTPException(status_code=400, detail="Promo code already exists.")
    promos.append(promo)
    save_promos(promos, file_path)
    return True

# Функция для получения промокода по его коду
def get_promo_by_code(code: str, file_path: Path = DEFAULT_PROMO_FILE) -> Optional[Promo]:
    promos = load_promos(file_path)
    for promo in promos:
        if promo.code == code:
            return promo
    return None

# Функция для удаления промокода по его коду
def delete_promo(code: str, file_path: Path = DEFAULT_PROMO_FILE) -> bool:
    promos = load_promos(file_path)
    updated_promos = [promo for promo in promos if promo.code != code]
    if len(promos) == len(updated_promos):  # Если промокод не найден
        return False
    save_promos(updated_promos, file_path)
    return True

# Функция для обновления информации о промокоде
def update_promo(code: str, updated_promo: Promo, file_path: Path = DEFAULT_PROMO_FILE) -> bool:
    promos = load_promos(file_path)
    for i, promo in enumerate(promos):
        if promo.code == code:
            promos[i] = updated_promo
            save_promos(promos, file_path)
            return True
    return False