from logs.config_logger import configurar_logging
from main_aux import safe_modbus_read
from utils import detect_serial_ports


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

def inicializar_conexion_modbus():
    """
    Inicializa la conexión con el dispositivo Modbus, detectando el puerto serie adecuado.

    Esta función busca un puerto serie disponible que coincida con las descripciones de los dispositivos
    'DigiRail Connect' o 'USB-SERIAL CH340'. Si se encuentra un puerto correspondiente, se retorna su nombre
    junto con la dirección predefinida del dispositivo Modbus.

    Returns:
        tuple: Una tupla que contiene el nombre del puerto serie encontrado y la dirección del dispositivo Modbus.

    Raises:
        SystemExit: Si no se detecta ningún puerto COM para el dispositivo.

    Proceso:
        - Intenta detectar un puerto serie para 'DigiRail Connect'.
        - Si no se encuentra, intenta detectar 'USB-SERIAL CH340'.
        - Si se encuentra un puerto, retorna su nombre y la dirección del dispositivo Modbus.
        - Si no se detecta ningún puerto, muestra un mensaje de error y sale del programa.
    """
    device_address = 1
    device_description = "DigiRail Connect"  
    com_port = detect_serial_ports(device_description)
    if com_port:
        logger.info(f"Puerto {device_description} detectado: {com_port}")
    else:
        device_description = "USB-SERIAL CH340"  
        com_port = detect_serial_ports(device_description)
        if com_port:
            logger.info(f"Puerto detectado: {com_port}\n")
        else:
            logger.error("No se detectaron puertos COM para tudispositivo.")
            input("Presiona una tecla para salir")
            exit()
    return com_port, device_address
















class ModbusConnectionError(Exception):
    """Excepción para errores de conexión con el dispositivo Modbus."""
    pass
