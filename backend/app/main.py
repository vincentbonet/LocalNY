import os
from contextlib import asynccontextmanager

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from . import cache, database

load_dotenv()

OPENSTATES_BASE = "https://v3.openstates.org"
API_KEY = os.getenv("OPENSTATES_API_KEY", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.init_db()
    yield


app = FastAPI(title="LocalNY API", version="1.0.0", lifespan=lifespan)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[FRONTEND_URL, "http://localhost:5173"],
    allow_methods=["GET"],
    allow_headers=["*"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/officials")
async def get_officials(
    lat: float = Query(..., description="Latitude"),
    lng: float = Query(..., description="Longitude"),
):
    cached = cache.get_geo(lat, lng)
    if cached:
        return cached

    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                f"{OPENSTATES_BASE}/people.geo",
                params={"lat": lat, "lng": lng, "apikey": API_KEY, "include": "offices,links"},
                timeout=10,
            )
            r.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"OpenStates error: {e}")

    data = r.json()
    cache.set_geo(lat, lng, data)
    return data


@app.get("/api/legislators")
async def get_legislators(
    chamber: str = Query(..., pattern="^(upper|lower)$", description="upper or lower"),
):
    cached = cache.get_legislators(chamber)
    if cached:
        return cached

    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                f"{OPENSTATES_BASE}/people",
                params={
                    "jurisdiction": "ocd-jurisdiction/country:us/state:ny/government",
                    "org_classification": chamber,
                    "per_page": 50,
                    "include": "links",
                    "apikey": API_KEY,
                },
                timeout=10,
            )
            r.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"OpenStates error: {e}")

    data = r.json()
    cache.set_legislators(chamber, data)
    return data


@app.get("/api/federal-legislators")
async def get_federal_legislators():
    cached = cache.get_legislators("federal")
    if cached:
        return cached

    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                f"{OPENSTATES_BASE}/people",
                params={
                    "jurisdiction": "ocd-jurisdiction/country:us/government",
                    "state": "ny",
                    "per_page": 50,
                    "include": "links",
                    "apikey": API_KEY,
                },
                timeout=10,
            )
            r.raise_for_status()
        except httpx.HTTPError as e:
            raise HTTPException(status_code=502, detail=f"OpenStates error: {e}")

    data = r.json()
    cache.set_legislators("federal", data)
    return data
