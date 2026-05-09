import os 
import psycopg2 
from psycopg2.pool import SimpleConnectionPool
from psycopg2.extras import Json 
from dotenv import load_dotenv 

load_dotenv() 

_pool = None