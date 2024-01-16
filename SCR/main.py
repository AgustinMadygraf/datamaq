#SCR/main.py
from main_aux import detect_serial_ports as detect_serial_ports_aux, check_db_connection as check_db_connection_aux, read_digital_input, read_high_resolution_register, update_database
from utils import clear_screen, check_db_connection, detect_serial_ports
import os
import minimalmodbus

class ModbusConnectionError(Exception):
    """Excepción para errores de conexión con el dispositivo Modbus."""
    pass

class DatabaseConnectionError(Exception):
    """Excepción para errores de conexión con la base de datos."""
    pass


device_description = "DigiRail Connect"  
com_port = detect_serial_ports(device_description)
if com_port:
    print(f"Puerto {device_description} detectado: {com_port}\n")
else:
    device_description = "USB-SERIAL CH340"  
    com_port = detect_serial_ports(device_description)
    if com_port:
        print(f"Puerto detectado: {com_port}\n")
    else:
        print("No se detectaron puertos COM para tu dispositivo.")
        input ("Presiona una tecla para salir")
        exit()

# Dirección del dispositivo Modbus (ajusta la dirección del dispositivo según tu configuración)
device_address = 1
# Entradas digitales
D1 = 70
# Contador
HR_COUNTER1_LO = 22
HR_COUNTER1_HI = 23


def main_loop():
    while True:
        clear_screen()
        process_modbus_operations()

def clear_screen():
    os.system('cls' if os.name == 'nt' else 'clear')

def process_modbus_operations():
    connection = establish_db_connection()
    instrument = establish_modbus_connection()

    if connection and instrument:
        process_digital_input(instrument, connection)
        process_high_resolution_register(instrument, connection)

def establish_db_connection():
    try:
        return check_db_connection()
    except Exception as e:
        print("Error de conexión a la base de datos:", str(e))
        raise DatabaseConnectionError("No se pudo conectar a la base de datos.") from e

def establish_modbus_connection():
    try:
        return minimalmodbus.Instrument(com_port, device_address)
    except Exception as e:
        print("Error al configurar el puerto serie:", str(e))
        raise ModbusConnectionError("No se pudo conectar con el dispositivo Modbus.") from e

def process_digital_input(instrument, connection):
    D1_state = read_digital_input(instrument, D1)
    if D1_state is not None:
        update_database(connection, D1, D1_state, descripcion="HR_INPUT1_STATE")

def process_high_resolution_register(instrument, connection):
    HR_COUNTER1_lo, HR_COUNTER1_hi = read_high_resolution_register(instrument, HR_COUNTER1_LO, HR_COUNTER1_HI)
    if HR_COUNTER1_lo is not None and HR_COUNTER1_hi is not None:
        update_database(connection, HR_COUNTER1_LO, HR_COUNTER1_lo, descripcion="HR_COUNTER1_LO ")
        update_database(connection, HR_COUNTER1_HI, HR_COUNTER1_hi, descripcion="HR_COUNTER1_HI ")


main_loop()
