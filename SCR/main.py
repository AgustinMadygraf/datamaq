#SCR/main.py
import minimalmodbus
import time
import os
from main_aux import detect_serial_ports, check_db_connection, read_digital_input, read_high_resolution_register, update_database

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

time.sleep(1)
# Dirección del dispositivo Modbus (ajusta la dirección del dispositivo según tu configuración)
device_address = 1
# Entradas digitales
D1 = 70
# Contador
HR_COUNTER1_LO = 22
HR_COUNTER1_HI = 23

while True:
    os.system('cls' if os.name == 'nt' else 'clear')
    # Realiza tus operaciones de lectura y actualización aquí.

    # Manejo de excepción personalizada para la conexión a la base de datos
    try:
        connection = check_db_connection()
    except Exception as e:  # Aquí deberías capturar una excepción más específica si es posible
        print("Error de conexión a la base de datos:", str(e))
        raise DatabaseConnectionError("No se pudo conectar a la base de datos.") from e

    try:
        instrument = minimalmodbus.Instrument(com_port, device_address)
    except Exception as e:
        print("Error al configurar el puerto serie:", str(e))
        raise ModbusConnectionError("No se pudo conectar con el dispositivo Modbus.") from e

    if connection:
        D1_state = read_digital_input(instrument, D1)
        HR_COUNTER1_lo, HR_COUNTER1_hi = read_high_resolution_register(instrument, HR_COUNTER1_LO, HR_COUNTER1_HI)
        if D1_state is not None:
            update_database(connection, D1, D1_state, descripcion="HR_INPUT1_STATE")
        if HR_COUNTER1_lo is not None and HR_COUNTER1_hi is not None:
            update_database(connection, HR_COUNTER1_LO, HR_COUNTER1_lo, descripcion="HR_COUNTER1_LO ")
            update_database(connection, HR_COUNTER1_HI, HR_COUNTER1_hi, descripcion="HR_COUNTER1_HI ")
    time.sleep(1)