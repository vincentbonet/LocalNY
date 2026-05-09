import json
from datetime import datetime, timedelta, timezone
from psycopg2.extras import Json

from .database import get_conn, put_conn

GEO_TTL_HOURS = 24
LEG_TTL_DAYS = 7


def get_geo(lat: float, lng: float) -> dict | None:
    lat_key, lng_key = round(lat, 3), round(lng, 3)
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT response FROM officials_cache
                WHERE lat_key = %s AND lng_key = %s AND expires_at > NOW()
                """,
                (lat_key, lng_key),
            )
            row = cur.fetchone()
            return row[0] if row else None
    finally:
        put_conn(conn)


def set_geo(lat: float, lng: float, data: dict):
    lat_key, lng_key = round(lat, 3), round(lng, 3)
    expires = datetime.now(timezone.utc) + timedelta(hours=GEO_TTL_HOURS)
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO officials_cache (lat_key, lng_key, response, expires_at)
                VALUES (%s, %s, %s, %s)
                ON CONFLICT (lat_key, lng_key) DO UPDATE SET
                    response   = EXCLUDED.response,
                    cached_at  = NOW(),
                    expires_at = EXCLUDED.expires_at
                """,
                (lat_key, lng_key, Json(data), expires),
            )
            conn.commit()
    finally:
        put_conn(conn)


def get_legislators(chamber: str) -> dict | None:
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                SELECT response FROM legislators_cache
                WHERE chamber = %s AND expires_at > NOW()
                """,
                (chamber,),
            )
            row = cur.fetchone()
            return row[0] if row else None
    finally:
        put_conn(conn)


def set_legislators(chamber: str, data: dict):
    expires = datetime.now(timezone.utc) + timedelta(days=LEG_TTL_DAYS)
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute(
                """
                INSERT INTO legislators_cache (chamber, response, expires_at)
                VALUES (%s, %s, %s)
                ON CONFLICT (chamber) DO UPDATE SET
                    response   = EXCLUDED.response,
                    cached_at  = NOW(),
                    expires_at = EXCLUDED.expires_at
                """,
                (chamber, Json(data), expires),
            )
            conn.commit()
    finally:
        put_conn(conn)
