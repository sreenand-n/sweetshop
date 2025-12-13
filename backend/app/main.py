from fastapi import FastAPI
from app.routes import auth, sweets
from app.core.database import Base, engine

# Create tables (for dev only — production should use Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sweet Shop Management System",
    version="1.0.0"
)

app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(sweets.router, prefix="/api/sweets", tags=["Sweets"])
