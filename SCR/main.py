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

def establish_connection(connect_func, error_message, error_exception):
    try:
        return connect_func()
    except Exception as e:
        print(f"{error_message}: {e}")
        raise error_exception(f"{error_message}. Detalles: {e}") from e

def establish_db_connection():
    return establish_connection(
        check_db_connection, 
        "Error de conexión a la base de datos", 
        DatabaseConnectionError
    )

def establish_modbus_connection():
    return establish_connection(
        lambda: minimalmodbus.Instrument(com_port, device_address), 
        "Error al configurar el puerto serie", 
        ModbusConnectionError
    )

def process_and_update(instrument, read_func, update_args_list):
    result = read_func(instrument)
    if all(value is not None for value in (result if isinstance(result, tuple) else [result])):
        for update_args in update_args_list:
            update_database(*update_args, result)

def process_input_and_update(instrument, connection, read_function, address, description):
    state = read_function(instrument, address)
    if state is not None:
        update_database(connection, address, state, descripcion=description)

def process_digital_input(instrument, connection):
    process_input_and_update(instrument, connection, read_digital_input, D1, "HR_INPUT1_STATE")

# Y similarmente para otras funciones de procesamiento...


def process_high_resolution_register(instrument, connection):
    process_and_update(
        instrument, 
        lambda inst: read_high_resolution_register(inst, HR_COUNTER1_LO, HR_COUNTER1_HI), 
        [
            (connection, HR_COUNTER1_LO, "HR_COUNTER1_LO"),
            (connection, HR_COUNTER1_HI, "HR_COUNTER1_HI")
        ]
    )


main_loop()
