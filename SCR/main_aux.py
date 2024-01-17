
import serial.tools.list_ports
import pymysql
import os
from logs.config_logger import configurar_logging

logger = configurar_logging()

def read_digital_input(instrument, address):
    """
    Lee el estado de una entrada digital de un dispositivo Modbus.

    Utiliza la función 'safe_modbus_read' para realizar una lectura segura de un bit del dispositivo
    Modbus especificado. Esta función se enfoca en leer estados de entradas digitales, como sensores on/off.

    Args:
        instrument (minimalmodbus.Instrument): El instrumento Modbus utilizado para la lectura.
        address (int): La dirección de la entrada digital a leer en el dispositivo Modbus.

    Returns:
        int/None: El estado de la entrada digital (1 o 0) si la lectura es exitosa, o None si ocurre un error.
    """
    return safe_modbus_read(instrument.read_bit, address, functioncode=2)

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
        logger.error(f"Error al leer del dispositivo Modbus: {e}")
        return None

def update_database(connection, address, value, descripcion):
    """
    Actualiza un registro en la base de datos con un valor específico.

    Esta función construye y ejecuta una consulta SQL para actualizar un registro en la base de datos.
    Imprime un mensaje indicando si la actualización fue exitosa o no. En caso de errores en la ejecución
    de la consulta, lanza una excepción personalizada `DatabaseUpdateError`.

    Args:
        connection (pymysql.connections.Connection): La conexión activa a la base de datos.
        address (int): La dirección del registro en la base de datos a actualizar.
        value: El valor a asignar en el registro especificado.
        descripcion (str): Descripción del registro para mostrar en mensajes de log.

    Raises:
        DatabaseUpdateError: Si ocurre un error al actualizar la base de datos.

    Returns:
        None
    """
    try:
        query, params = build_update_query(address, value)
        if execute_query(connection, query, params):
            logger.info(f"Registro actualizado: dirección {address}, {descripcion} valor {value}")
        else:
            logger.error(f"No se pudo actualizar el registro: dirección {address}, {descripcion}")
    except pymysql.MySQLError as e:
        raise DatabaseUpdateError(f"Error al actualizar la base de datos en la dirección {address} con el valor {value}: {e}") from e

def build_update_query(address, value):
    """
    Construye una consulta SQL de actualización y sus parámetros.

    Esta función genera una consulta SQL para actualizar un registro en la tabla 'registros_modbus',
    utilizando la dirección del registro y el nuevo valor a asignar. La consulta se construye de
    manera parametrizada para prevenir inyecciones SQL.

    Args:
        address (int): La dirección del registro en la base de datos a actualizar.
        value: El nuevo valor a asignar en el registro especificado.

    Returns:
        tuple: Una tupla conteniendo la consulta SQL como string y los parámetros como una tupla.
    """
    query = "UPDATE registros_modbus SET valor = %s WHERE direccion_modbus = %s"
    params = (value, address)
    return query, params

def execute_query(connection, query, params):
    """
    Ejecuta una consulta SQL en la base de datos especificada.

    Esta función intenta ejecutar una consulta SQL utilizando la conexión y los parámetros proporcionados.
    En caso de éxito, confirma (commit) la transacción. Si ocurre un error durante la ejecución de la consulta,
    imprime un mensaje de error y retorna False.

    Args:
        connection (pymysql.connections.Connection): La conexión activa a la base de datos.
        query (str): La consulta SQL a ejecutar.
        params (tuple): Parámetros para la consulta SQL.

    Returns:
        bool: True si la consulta se ejecuta con éxito, False en caso de error.
    """
    if not connection:
        logger.error("No hay una conexión activa a la base de datos.")
        return False

    try:
        with connection.cursor() as cursor:
            cursor.execute(query, params)
            connection.commit()
        return True
    except Exception as e:
        logger.error(f"Error al ejecutar la consulta en la base de datos: {e}")
        return False

#########################################################################################################

# Configuración de la base de datos MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'db': 'novus'  # Base de datos y subíndice
}
def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def read_high_resolution_register(instrument, address_lo, address_hi):
    value_lo = safe_modbus_read(instrument.read_register, address_lo, functioncode=3)
    value_hi = safe_modbus_read(instrument.read_register, address_hi, functioncode=3)
    return value_lo, value_hi

def build_update_query(address, value):
    return "UPDATE registros_modbus SET valor = %s WHERE direccion_modbus = %s", (value, address)



class DatabaseUpdateError(Exception):
    """Excepción para errores en la actualización de la base de datos."""
    pass

