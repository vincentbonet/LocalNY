import logging
import os
from contextlib import asynccontextmanager

import httpx
from dotenv import load_dotenv
from fastapi import FastAPI, HTTPException, Query, Request
from fastapi.middleware.cors import CORSMiddleware
from slowapi import Limiter, _rate_limit_exceeded_handler
from slowapi.errors import RateLimitExceeded
from slowapi.util import get_remote_address

from . import cache, database

load_dotenv()

logger = logging.getLogger(__name__)

OPENSTATES_BASE = "https://v3.openstates.org"
API_KEY = os.getenv("OPENSTATES_API_KEY", "")
FRONTEND_URL = os.getenv("FRONTEND_URL", "http://localhost:5173")

limiter = Limiter(key_func=get_remote_address)


@asynccontextmanager
async def lifespan(app: FastAPI):
    database.init_db()
    yield


app = FastAPI(title="LocalNY API", version="1.0.0", lifespan=lifespan, redirect_slashes=False)
app.state.limiter = limiter
app.add_exception_handler(RateLimitExceeded, _rate_limit_exceeded_handler)

allowed_origins = [FRONTEND_URL]
if os.getenv("ENVIRONMENT") != "production":
    allowed_origins.append("http://localhost:5173")

app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_methods=["GET"],
    allow_headers=["Content-Type", "Accept"],
)


@app.get("/health")
def health():
    return {"status": "ok"}


@app.get("/api/officials")
@limiter.limit("30/minute")
async def get_officials(
    request: Request,
    lat: float = Query(..., ge=-90, le=90, description="Latitude"),
    lng: float = Query(..., ge=-180, le=180, description="Longitude"),
):
    cached = cache.get_geo(lat, lng)
    if cached:
        return cached

    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                f"{OPENSTATES_BASE}/people.geo",
                params={"lat": lat, "lng": lng, "apikey": API_KEY, "include": "links"},
                timeout=10,
            )
            r.raise_for_status()
        except httpx.HTTPError as e:
            logger.error("OpenStates /people.geo error: %s", e)
            raise HTTPException(status_code=502, detail="External service unavailable")

    data = r.json()
    cache.set_geo(lat, lng, data)
    return data


@app.get("/api/legislators")
@limiter.limit("20/minute")
async def get_legislators(
    request: Request,
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
            logger.error("OpenStates /people error: %s", e)
            raise HTTPException(status_code=502, detail="External service unavailable")

    data = r.json()
    cache.set_legislators(chamber, data)
    return data


@app.get("/api/person")
@limiter.limit("30/minute")
async def get_person(request: Request, id: str = Query(...)):
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                f"{OPENSTATES_BASE}/people/{id}",
                params={"apikey": API_KEY, "include": "links,other_identifiers"},
                timeout=10,
            )
            r.raise_for_status()
        except httpx.HTTPError as e:
            logger.error("OpenStates /people/{id} error: %s", e)
            raise HTTPException(status_code=502, detail="External service unavailable")

    p = r.json()
    role = p.get("current_role") or {}
    twitter = next(
        (s["identifier"] for s in (p.get("other_identifiers") or []) if s.get("scheme") == "twitter"),
        None,
    )
    return {
        "id": p["id"],
        "name": p["name"],
        "party": p.get("party", "Unknown"),
        "photoUrl": p.get("image"),
        "email": p.get("email"),
        "website": (p.get("links") or [{}])[0].get("url"),
        "twitter": twitter,
        "title": role.get("title", ""),
        "district": str(role.get("district", "")),
        "chamber": role.get("org_classification", ""),
        "jurisdiction": p.get("jurisdiction", {}).get("name", ""),
        "links": p.get("links", []),
    }


@app.get("/api/person/bills")
@limiter.limit("20/minute")
async def get_person_bills(request: Request, id: str = Query(...)):
    async with httpx.AsyncClient() as client:
        try:
            r = await client.get(
                f"{OPENSTATES_BASE}/bills",
                params={
                    "apikey": API_KEY,
                    "sponsor_id": id,
                    "per_page": 10,
                    "sort": "-updated_at",
                },
                timeout=10,
            )
            r.raise_for_status()
        except httpx.HTTPError as e:
            logger.error("OpenStates /bills error: %s", e)
            raise HTTPException(status_code=502, detail="External service unavailable")

    results = r.json().get("results", [])
    return [
        {
            "id": b["id"],
            "title": b.get("title", ""),
            "identifier": b.get("identifier", ""),
            "status": (b.get("latest_action_description") or b.get("status") or ""),
            "updatedAt": b.get("updated_at", ""),
            "url": (b.get("sources") or [{}])[0].get("url"),
        }
        for b in results
    ]


@app.get("/api/federal-legislators")
@limiter.limit("20/minute")
async def get_federal_legislators(request: Request):
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
            logger.error("OpenStates /people federal error: %s", e)
            raise HTTPException(status_code=502, detail="External service unavailable")

    data = r.json()
    cache.set_legislators("federal", data)
    return data
