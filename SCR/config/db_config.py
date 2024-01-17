# config/db_config.py
import os

def get_db_config():
    return {
        'host': os.getenv('DB_HOST', 'localhost'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', '12345678'),
        'db': 'novus',
        'port': 3306  
    }
