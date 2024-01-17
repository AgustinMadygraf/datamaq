D1 = 70
D2 = 71
HR_COUNTER1_LO = 22
HR_COUNTER1_HI = 23

from logs.config_logger import configurar_logging
from main_aux import safe_modbus_read, read_high_resolution_register
from utils import detect_serial_ports
from main_aux import   update_database


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


def process_high_resolution_register(instrument, connection):
    """
    Procesa y actualiza los registros de alta resolución de un dispositivo Modbus.

    Lee los valores de los registros de alta resolución especificados en un dispositivo Modbus
    y actualiza la base de datos con estos valores. Se utiliza una función lambda para leer
    los registros de alta resolución y luego se actualizan los valores correspondientes en la base de datos.

    Args:
        instrument (minimalmodbus.Instrument): El instrumento Modbus utilizado para la lectura.
        connection (pymysql.connections.Connection): Conexión a la base de datos para actualizar los valores.

    Proceso:
        - Lee los valores de los registros HR_COUNTER1_LO y HR_COUNTER1_HI del dispositivo Modbus.
        - Actualiza la base de datos con estos valores, utilizando las descripciones "HR_COUNTER1_LO" y "HR_COUNTER1_HI".
    """
    process_and_update(
        instrument, 
        lambda inst: read_high_resolution_register(inst, HR_COUNTER1_LO, HR_COUNTER1_HI), 
        [
            (connection, HR_COUNTER1_LO, "HR_COUNTER1_LO"),
            (connection, HR_COUNTER1_HI, "HR_COUNTER1_HI")
        ]
    )

def process_and_update(instrument, read_func, update_args_list):
    """
    Lee un valor o valores de un dispositivo Modbus y actualiza la base de datos según corresponda.

    Utiliza una función de lectura proporcionada para obtener un resultado del dispositivo Modbus.
    Si el resultado es válido (no None y no contiene valores None), procede a actualizar la base de datos
    con los argumentos especificados en `update_args_list`.

    Args:
        instrument (minimalmodbus.Instrument): El instrumento Modbus utilizado para la lectura.
        read_func (function): Función de lectura para obtener datos del dispositivo Modbus.
        update_args_list (list of tuples): Lista de argumentos para pasar a la función `update_database`.
                                         Cada tupla debe contener los argumentos necesarios para una actualización.

    Proceso:
        - Obtiene un resultado de `read_func`.
        - Imprime el resultado para depuración.
        - Verifica que todos los valores en el resultado sean válidos (no None).
        - Si son válidos, itera sobre `update_args_list` y actualiza la base de datos con cada conjunto de argumentos y el resultado.

    Notas:
        - La función `read_func` debería devolver un valor único o una tupla de valores.
        - `update_args_list` contiene tuplas con los argumentos para `update_database`, excluyendo el último argumento que es el resultado de `read_func`.
        - Esta función se utiliza para procesar y actualizar múltiples valores en la base de datos en una sola operación, basándose en una lectura de Modbus.
    """
    result = read_func(instrument)
    if all(value is not None for value in (result if isinstance(result, tuple) else [result])):
        for update_args in update_args_list:
            update_database(*update_args, result)












class ModbusConnectionError(Exception):
    """Excepción para errores de conexión con el dispositivo Modbus."""
    pass
