#MainDataCollector.py
import minimalmodbus
import time
import os
from datetime import datetime
from DatabaseOperations import check_db_connection, update_database, insert_database
from ModbusDeviceManager import detect_com_port, initialize_modbus_device, configure_modbus_instrument
from InstrumentDataReaders import read_digital_input, read_high_resolution_register
from logs.config_logger import configurar_logging

logger = configurar_logging()

# Constantes Globales
DEVICE_DESCRIPTIONS = ["DigiRail Connect", "USB-SERIAL CH340"]
DEVICE_ADDRESS = 1
D1 = 70
D2 = 71
HR_COUNTER1_LO = 22
HR_COUNTER1_HI = 23
HR_COUNTER2_LO = 24
HR_COUNTER2_HI = 25

seg = 1
com_port, device_description = initialize_modbus_device(DEVICE_DESCRIPTIONS)

def read_and_update_data(instrument, connection):
    D1_state = read_digital_input(instrument, D1)
    HR_COUNTER1_lo, HR_COUNTER1_hi = read_high_resolution_register(instrument, HR_COUNTER1_LO, HR_COUNTER1_HI)
    HR_COUNTER1 = None
    if HR_COUNTER1_lo is not None and HR_COUNTER1_hi is not None:
        HR_COUNTER1 = HR_COUNTER1_lo + HR_COUNTER1_hi * 65536

    if D1_state is not None:
        update_database(connection, D1, D1_state, descripcion="HR_INPUT1_STATE")
    if HR_COUNTER1_lo is not None and HR_COUNTER1_hi is not None:
        update_database(connection, HR_COUNTER1_LO, HR_COUNTER1_lo, descripcion="HR_COUNTER1_LO ")
        update_database(connection, HR_COUNTER1_HI, HR_COUNTER1_hi, descripcion="HR_COUNTER1_HI ")

    return HR_COUNTER1

def handle_update_timing():
    fecha_ahora = int(time.time())
    fecha_sig = ((fecha_ahora // 300 + 1) * 300)
    seg = fecha_sig - fecha_ahora
    logger.info(f"Próxima actualización a las {datetime.fromtimestamp(fecha_sig)}")
    logger.info(f"Tiempo para la siguiente actualización: {round(seg, 1)} segundos")
    return fecha_ahora, seg

while True:
    os.system('cls' if os.name == 'nt' else 'clear')
    connection = check_db_connection()
    instrument = configure_modbus_instrument(com_port, DEVICE_ADDRESS,device_description)
    if instrument and connection:
        HR_COUNTER1 = read_and_update_data(instrument, connection)
        fecha_ahora, seg = handle_update_timing()

        if seg < 2 and HR_COUNTER1 is not None:
            try:
                insert_database(connection, fecha_ahora, HR_COUNTER1)
                time.sleep(15)
            except Exception as e:
                logger.error("Error al insertar en la base de datos:", e)

    time.sleep(1)