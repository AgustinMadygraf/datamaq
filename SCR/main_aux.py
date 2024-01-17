
import serial.tools.list_ports
import pymysql
import os
from utils import check_db_connection, detect_serial_ports


def update_database(connection, address, value, descripcion):
    try:
        query, params = build_update_query(address, value)
        if execute_query(connection, query, params):
            print(f"Registro actualizado: dirección {address}, {descripcion} valor {value}")
        else:
            print(f"No se pudo actualizar el registro: dirección {address}, {descripcion}")
        pass
    except pymysql.MySQLError as e:
        raise DatabaseUpdateError(f"Error al actualizar la base de datos en la dirección {address} con el valor {value}: {e}") from e

def update_database(connection, address, value, descripcion):
    
    query, params = build_update_query(address, value)
    if execute_query(connection, query, params):
        print(f"Registro actualizado: dirección {address}, {descripcion} valor {value}")
    else:
        print(f"No se pudo actualizar el registro: dirección {address}, {descripcion}")

# Configuración de la base de datos MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'db': 'novus'  # Base de datos y subíndice
}
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def safe_modbus_read(method, *args, **kwargs):
    """
    Realiza una lectura segura de un dispositivo Modbus.

    Envuelve la llamada a un método de lectura Modbus en un bloque try-except para manejar excepciones.
    Proporciona un mecanismo de recuperación y registro de errores en caso de fallas en la lectura.

    Args:
        method (callable): Método de lectura Modbus a ser invocado.
        *args: Argumentos posicionales para el método de lectura.
        **kwargs: Argumentos de palabra clave para el método de lectura.

    Returns:
        El resultado del método de lectura si es exitoso, o None si ocurre una excepción.
    """
    try:
        return method(*args, **kwargs)
    except Exception as e:
        print(f"Error al leer del dispositivo Modbus: {e}")
        return None

def read_digital_input(instrument, address):
    return safe_modbus_read(instrument.read_bit, address, functioncode=2)

def read_high_resolution_register(instrument, address_lo, address_hi):
    value_lo = safe_modbus_read(instrument.read_register, address_lo, functioncode=3)
    value_hi = safe_modbus_read(instrument.read_register, address_hi, functioncode=3)
    return value_lo, value_hi

def build_update_query(address, value):
    return "UPDATE registros_modbus SET valor = %s WHERE direccion_modbus = %s", (value, address)

def execute_query(connection, query, params):
    if connection:
        try:
            with connection.cursor() as cursor:
                cursor.execute(query, params)
                connection.commit()
        except Exception as e:
            print(f"Error al ejecutar la consulta en la base de datos: {e}")
            return False
    return True

class DatabaseUpdateError(Exception):
    """Excepción para errores en la actualización de la base de datos."""
    pass

