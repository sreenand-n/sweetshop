from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.core.database import get_db
from app.schemas.sweet import SweetCreate, SweetUpdate, SweetResponse
from app.services.sweet_service import (
    create_sweet, list_sweets, search_sweets,
    update_sweet, delete_sweet,
    purchase_sweet, restock_sweet
)
from app.utils.jwt import get_current_user, get_admin_user

router = APIRouter()

# CREATE (ADMIN ONLY)
@router.post("/", response_model=SweetResponse)
def create(data: SweetCreate,
           db: Session = Depends(get_db),
           current_user=Depends(get_admin_user)):
    return create_sweet(db, data)

# LIST ALL SWEETS
@router.get("/", response_model=list[SweetResponse])
def list_all(db: Session = Depends(get_db),
             current_user=Depends(get_current_user)):
    return list_sweets(db)

# SEARCH ENDPOINT
@router.get("/search", response_model=list[SweetResponse])
def search(name: str | None = None,
           category: str | None = None,
           min_price: float | None = None,
           max_price: float | None = None,
           db: Session = Depends(get_db),
           current_user=Depends(get_current_user)):

    return search_sweets(db, name, category, min_price, max_price)

# UPDATE (ADMIN ONLY)
@router.put("/{sweet_id}", response_model=SweetResponse)
def update(sweet_id: int,
           data: SweetUpdate,
           db: Session = Depends(get_db),
           current_user=Depends(get_admin_user)):
    return update_sweet(db, sweet_id, data)

# DELETE (ADMIN ONLY)
@router.delete("/{sweet_id}")
def delete(sweet_id: int,
           db: Session = Depends(get_db),
           current_user=Depends(get_admin_user)):
    delete_sweet(db, sweet_id)
    return {"message": "Sweet deleted successfully"}

# PURCHASE (Authenticated)
@router.post("/{sweet_id}/purchase", response_model=SweetResponse)
def purchase(sweet_id: int,
             db: Session = Depends(get_db),
             current_user=Depends(get_current_user)):
    return purchase_sweet(db, sweet_id)

# RESTOCK (ADMIN ONLY)
@router.post("/{sweet_id}/restock", response_model=SweetResponse)
def restock(sweet_id: int,
            amount: int,
            db: Session = Depends(get_db),
            current_user=Depends(get_admin_user)):
    return restock_sweet(db, sweet_id, amount)
