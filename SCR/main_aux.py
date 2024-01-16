
import serial.tools.list_ports
import pymysql
import os
from utils import check_db_connection, detect_serial_ports


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


# Función para actualizar registros en la base de datos
def update_database(connection, address, value, descripcion):
    if connection:
        try:
            with connection.cursor() as cursor:
                # Uso de parámetros en lugar de interpolación directa de strings para evitar SQL Injection
                sql = "UPDATE registros_modbus SET valor = %s WHERE direccion_modbus = %s"
                cursor.execute(sql, (value, address))
                connection.commit()
                print(f"Registro actualizado: dirección {address}, {descripcion} valor {value}")
        except Exception as e:
            print(f"Error al actualizar el registro en la base de datos: {e}")
