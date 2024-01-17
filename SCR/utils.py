# utils.py

import serial.tools.list_ports
import pymysql
import os
import functools
import pymysql

def detect_serial_ports(device_description):
    """
    Busca y retorna el nombre del puerto serie que coincide con la descripción del dispositivo dada.

    Esta función recorre todos los puertos serie disponibles en el sistema y compara la descripción
    de cada uno con la descripción del dispositivo proporcionada. Si encuentra una coincidencia,
    retorna el nombre del puerto serie correspondiente.

    Args:
        device_description (str): La descripción del dispositivo Modbus a buscar entre los puertos serie.

    Returns:
        str/None: El nombre del puerto serie que coincide con la descripción del dispositivo, o None si no se encuentra.
    """
    available_ports = list(serial.tools.list_ports.comports())
    for port, desc, hwid in available_ports:
        if device_description in desc:
            return port
    return None




################################################################################
# Configuración de la base de datos MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'db': 'novus'
}

def clear_screen():
    """
    Limpia la pantalla de la consola.

    Determina el sistema operativo y ejecuta el comando correspondiente para limpiar la pantalla de la consola. 
    Utiliza 'cls' para Windows y 'clear' para sistemas basados en Unix.
    """
    os.system('cls' if os.name == 'nt' else 'clear')

def reconnect_on_failure(func):
    @functools.wraps(func)
    def wrapper_reconnect(*args, **kwargs):
        try:
            return func(*args, **kwargs)
        except (pymysql.OperationalError, pymysql.MySQLError) as e:
            print(f"Se detectó un error en la conexión a la base de datos: {e}. Intentando reconectar...")
            # Intenta reconectar aquí. Puedes especificar un número de reintentos si es necesario.
            try:
                connection = pymysql.connect(**db_config)
                args = (connection,) + args[1:]  # Reemplazar la conexión antigua con la nueva
                return func(*args, **kwargs)
            except Exception as e:
                print(f"No se pudo reconectar a la base de datos: {e}")
                return None
    return wrapper_reconnect

@reconnect_on_failure
def check_db_connection():
    connection = pymysql.connect(**db_config)
    return connection
