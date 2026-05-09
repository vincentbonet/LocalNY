import os 
import psycopg2 
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import Json 
from dotenv import load_dotenv 

load_dotenv() 

_pool = None


def get_pool() -> SimpleConnectionPool:
    global _pool
    if _pool is None:
        _pool = SimpleConnectionPool(1, 10, dsn=os.getenv("DATABASE_URL"))
    return _pool 

def get_connection(conn): 
    get_pool().putconn(conn)


def init_db():
    conn = get_conn()
    try:
        with conn.cursor() as cur:
            cur.execute("""
                CREATE TABLE IF NOT EXISTS officials_cache (
                    id          SERIAL PRIMARY KEY,
                    lat_key     NUMERIC(8, 3) NOT NULL,
                    lng_key     NUMERIC(8, 3) NOT NULL,
                    response    JSONB         NOT NULL,
                    cached_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
                    expires_at  TIMESTAMPTZ   NOT NULL,
                    UNIQUE (lat_key, lng_key)
                )
            """)
            cur.execute("""
                CREATE TABLE IF NOT EXISTS legislators_cache (
                    id          SERIAL PRIMARY KEY,
                    chamber     VARCHAR(10)   NOT NULL UNIQUE,
                    response    JSONB         NOT NULL,
                    cached_at   TIMESTAMPTZ   NOT NULL DEFAULT NOW(),
                    expires_at  TIMESTAMPTZ   NOT NULL
                )
            """)
            conn.commit()
    finally:
        put_conn(conn)