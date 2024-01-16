# config/db_config.py
import os

# Mejora: separar la configuración de la base de datos en una función para mayor flexibilidad y control
def get_db_config():
    return {
        'host': os.getenv('DB_HOST', 'localhost'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', ''),
        'db': 'novus',
        'port': 3306  
    }
