# config/db_config.py
import os

def get_db_config():
    """
    Obtiene la configuración de la base de datos desde variables de entorno.

    Esta función construye un diccionario con la configuración necesaria para conectarse a una base de datos MySQL.
    Los valores de configuración se obtienen de variables de entorno, proporcionando una forma segura y flexible
    de manejar la configuración sin hardcodear valores en el código.

    Los valores por defecto son proporcionados para cada parámetro, que se usarán si las variables de entorno
    correspondientes no están definidas.

    Returns:
        dict: Un diccionario que contiene los parámetros de configuración de la base de datos, incluyendo
              host, usuario, contraseña, nombre de la base de datos y puerto.
    """
    return {
        'host': os.getenv('DB_HOST', 'localhost'),
        'user': os.getenv('DB_USER', 'root'),
        'password': os.getenv('DB_PASSWORD', '12345678'),
        'db': 'novus',
        'port': 3306  
    }
