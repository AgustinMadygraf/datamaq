#MainDataCollector.py
import time
import os
from datetime import datetime
from DatabaseOperations import check_db_connection, update_database, insert_database
from ModbusDeviceManager import initialize_modbus_device, configure_modbus_instrument
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

def read_register_and_update_db(instrument, address_lo, address_hi, connection, description):
    lo, hi = read_high_resolution_register(instrument, address_lo, address_hi)
    if lo is not None and hi is not None:
        value = lo + hi * 65536
        update_database(connection, address_lo, lo, descripcion=description + "_LO")
        update_database(connection, address_hi, hi, descripcion=description + "_HI")
        return value
    return None

def read_register_and_update_db(instrument, address_lo, address_hi, connection, description):
    lo, hi = read_high_resolution_register(instrument, address_lo, address_hi)
    if lo is not None and hi is not None:
        value = lo + hi * 65536
        update_database(connection, address_lo, lo, descripcion=description + "_LO")
        update_database(connection, address_hi, hi, descripcion=description + "_HI")
        return value
    return None

def read_and_update_data(instrument, connection):
    try:
        D1_state = read_digital_input(instrument, D1)
        if D1_state is not None:
            update_database(connection, D1, D1_state, descripcion="HR_INPUT1_STATE")
        HR_COUNTER1 = read_register_and_update_db(instrument, HR_COUNTER1_LO, HR_COUNTER1_HI, connection, "HR_COUNTER1")
        return HR_COUNTER1

    except Exception as e:
        logger.error(f"Error en read_and_update_data: {e}")
        return None


def handle_update_timing():
    fecha_ahora = int(time.time())
    fecha_sig = ((fecha_ahora // 300 + 1) * 300)
    seg = fecha_sig - fecha_ahora
    logger.info(f"Próxima actualización a las {datetime.fromtimestamp(fecha_sig)}")
    logger.info(f"Tiempo para la siguiente actualización: {round(seg, 1)} segundos")
    return fecha_ahora, seg

def main_loop():
    while True:
        try:
            connection = check_db_connection()
            instrument = configure_modbus_instrument(com_port, DEVICE_ADDRESS, device_description)

            if instrument and connection:
                HR_COUNTER1 = read_and_update_data(instrument, connection)
                fecha_ahora, seg = handle_update_timing()

                if seg < 2 and HR_COUNTER1 is not None:
                    insert_database(connection, fecha_ahora, HR_COUNTER1)
                    time.sleep(15)  # Espera antes de la próxima inserción

            time.sleep(1)  # Pequeña pausa para evitar uso excesivo de CPU

        except Exception as e:
            logger.error(f"Error en el bucle principal: {e}")
            time.sleep(10)  # Espera antes de reintentar para evitar ciclos de error rápidos

if __name__ == "__main__":
    main_loop()
