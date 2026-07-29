from fastapi import FastAPI
from app.routers import usuarios
from app.data.db import engine
from app.data import usuarioDB
from fastapi.middleware.cors import CORSMiddleware

#pertenece al funcionamiento del ORM de SQLAlchemy y sirve para 
#crear automáticamente las tablas en la base de datos si aún no existen.
usuarioDB.Base.metadata.create_all(bind=engine)

app = FastAPI(
    title="API usuarios ",
    description="Victor Osvaldo Rodriguez Hernandez",
    version="1.0.0"
)

origins = [
    "http://localhost:8081",   
    "http://127.0.0.1:8081", 
]
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_origin_regex=".*",
    allow_credentials=False,
    allow_methods=["*"],
    allow_headers=["*"]
)

app.include_router(usuarios.router)