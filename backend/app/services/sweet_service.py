from sqlalchemy.orm import Session
from fastapi import HTTPException
from app.models.sweet import Sweet
from app.schemas.sweet import SweetCreate, SweetUpdate


# CREATE
def create_sweet(db: Session, data: SweetCreate):
    sweet = Sweet(**data.dict())
    db.add(sweet)
    db.commit()
    db.refresh(sweet)
    return sweet

# READ (LIST)
def list_sweets(db: Session):
    return db.query(Sweet).all()

# SEARCH
def search_sweets(db: Session, name: str = None, category: str = None,
                  min_price: float = None, max_price: float = None):

    query = db.query(Sweet)

    if name:
        query = query.filter(Sweet.name.ilike(f"%{name}%"))
    if category:
        query = query.filter(Sweet.category.ilike(category))
    if min_price is not None:
        query = query.filter(Sweet.price >= min_price)
    if max_price is not None:
        query = query.filter(Sweet.price <= max_price)

    return query.all()

# UPDATE
def update_sweet(db: Session, sweet_id: int, data: SweetUpdate):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    update_data = data.dict(exclude_unset=True)
    for key, value in update_data.items():
        setattr(sweet, key, value)

    db.commit()
    db.refresh(sweet)
    return sweet

# DELETE (ADMIN ONLY)
def delete_sweet(db: Session, sweet_id: int):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    db.delete(sweet)
    db.commit()

# PURCHASE
def purchase_sweet(db: Session, sweet_id: int):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if sweet.quantity <= 0:
        raise HTTPException(status_code=400, detail="Out of stock")

    sweet.quantity -= 1
    db.commit()
    db.refresh(sweet)
    return sweet

# RESTOCK (ADMIN ONLY)
def restock_sweet(db: Session, sweet_id: int, amount: int):
    sweet = db.query(Sweet).filter(Sweet.id == sweet_id).first()

    if not sweet:
        raise HTTPException(status_code=404, detail="Sweet not found")

    if amount <= 0:
        raise HTTPException(status_code=400, detail="Restock amount must be positive")

    sweet.quantity += amount
    db.commit()
    db.refresh(sweet)
    return sweet
