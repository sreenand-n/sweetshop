from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.routes import auth, sweets
from app.core.database import Base, engine

# Create tables (DEV ONLY — production should use Alembic)
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="Sweet Shop Management System",
    version="1.0.0"
)

# ✅ CORS MIDDLEWARE (THIS FIXES THE 405 OPTIONS ERROR)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173"],  # React dev server
    allow_credentials=True,
    allow_methods=["*"],  # VERY IMPORTANT (allows OPTIONS)
    allow_headers=["*"],
)

# Routes
app.include_router(auth.router, prefix="/api/auth", tags=["Authentication"])
app.include_router(sweets.router, prefix="/api/sweets", tags=["Sweets"])
