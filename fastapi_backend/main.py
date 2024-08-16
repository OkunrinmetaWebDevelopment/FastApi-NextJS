from core import config
from db_models.models import Base
import logging
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from api.routes import user, workouts,routines

logger = logging.getLogger()

Base.metadata.create_all(bind=config.get_engine_from_settings())


def get_application():
    app = FastAPI(title=config.PROJECT_NAME, version=config.VERSION)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=['http://localhost:3000'],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )
    app.include_router(user.router)
    app.include_router(workouts.router)
    app.include_router(routines.router)
    # app.include_router(google_drive.router)

    return app


app = get_application()