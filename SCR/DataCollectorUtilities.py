#DataCollectorUtilities.py
import serial.tools.list_ports
import pymysql
from datetime import datetime

# Configuración de la base de datos MySQL
db_config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'db': 'novus'  # Base de datos y subíndice
}

def detect_serial_ports(device_description):
    available_ports = list(serial.tools.list_ports.comports())
    for port, desc, hwid in available_ports:
        if device_description in desc:
            return port
    return None

# Función para verificar la conexión a la base de datos
def check_db_connection():
    try:
        connection = pymysql.connect(**db_config)
        return connection
    except Exception as e:
        print(f"Error de conexión a la base de datos: {e}")
        return None

# Función para leer una entrada digital
def read_digital_input(instrument, address):
    if instrument:
        try:
            result = instrument.read_bit(address, functioncode=2)
            return result
        except Exception as e:
            print(f"Error al leer entrada digital en registro {address}: {e}")
    return None

# Función para leer registros de alta resolución
def read_high_resolution_register(instrument, address_lo, address_hi):
    if instrument:
        try:
            value_lo = instrument.read_register(address_lo, functioncode=3)
            value_hi = instrument.read_register(address_hi, functioncode=3)
            return value_lo, value_hi
        except Exception as e:
            print(f"Error al leer registro de alta resolución en registros {address_lo} y {address_hi}: {e}")
    return None, None

# Función para actualizar registros en la base de datos
def update_database(connection, address, value, descripcion):
    if connection:
        try:
            with connection.cursor() as cursor:
                sql = f"UPDATE registros_modbus SET valor = {value} WHERE direccion_modbus = {address}"
                cursor.execute(sql)
                connection.commit()
                print(f"Registro actualizado: dirección {address}, {descripcion} valor {value}")
        except Exception as e:
            print(f"Error al actualizar el registro en la base de datos: {e}")

def insert_database(connection, fecha_ahora, HR_COUNTER1):
    if connection:
        try:
            with connection.cursor() as cursor:
                sql = f"INSERT INTO `maq_bolsas`( `unixtime`, `HR_COUNTER1`) VALUES ({fecha_ahora}, {HR_COUNTER1})"
                cursor.execute(sql)
                connection.commit()
                print(f"Registro Insertado: unixtime = {fecha_ahora}, HR_COUNTER1= {HR_COUNTER1} , timestamp = {datetime.fromtimestamp(fecha_ahora)}")
        except Exception as e:
            print(f"Error al insertar el registro en la base de datos: {e}")






