#SCR/main.py
from main_aux import detect_serial_ports as detect_serial_ports_aux, check_db_connection as check_db_connection_aux, read_digital_input, read_high_resolution_register, update_database
from utils import clear_screen, check_db_connection, detect_serial_ports
import os
import minimalmodbus
import time

D1 = 70
D2 = 71
HR_COUNTER1_LO = 22
HR_COUNTER1_HI = 23

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



def main_loop():
    """
    Ejecuta el bucle principal del programa, procesando operaciones Modbus continuamente.

    Esta función define un bucle infinito que, en cada iteración, espera un segundo y luego
    ejecuta las operaciones relacionadas con Modbus. Está diseñada para mantener el programa
    en ejecución y procesando datos de manera continua.

    Proceso:
        - Entra en un bucle infinito.
        - En cada iteración, pausa la ejecución durante un segundo para evitar la sobrecarga.
        - Llama a la función `process_modbus_operations` para realizar las operaciones necesarias con el dispositivo Modbus.

    Nota:
        - Este bucle es infinito y el programa debe ser detenido manualmente o mediante señales del sistema.
        - La pausa de un segundo es importante para evitar el uso excesivo de recursos, especialmente en un contexto de comunicación con hardware.
    """
    #inicio()
    while True:
        print("")
        time.sleep(1)
        process_modbus_operations()

def process_modbus_operations():
    """
    Gestiona las operaciones de comunicación Modbus y base de datos.

    Establece conexiones tanto con el dispositivo Modbus como con la base de datos.
    Si ambas conexiones son exitosas, procesa las entradas digitales y los registros
    de alta resolución del dispositivo Modbus y actualiza la base de datos en consecuencia.

    - Primero, intenta establecer una conexión con la base de datos.
    - Luego, intenta establecer una conexión con el dispositivo Modbus.
    - Si ambas conexiones son exitosas:
        * Procesa las entradas digitales del dispositivo Modbus.
        * Procesa los registros de alta resolución del dispositivo Modbus.
    - Si alguna conexión falla, el proceso se detiene y se manejan las excepciones correspondientes.
    """
    connection = establish_db_connection()
    instrument = establish_modbus_connection()

    if connection and instrument:
        process_digital_input(instrument, connection)
        process_high_resolution_register(instrument, connection)

def establish_db_connection():
    """
    Establece una conexión con la base de datos utilizando una función auxiliar.

    Esta función utiliza `establish_connection`, una función de alto nivel, para intentar
    establecer una conexión con la base de datos. Si la conexión falla, se maneja 
    la excepción correspondiente.

    Returns:
        Una conexión activa a la base de datos si es exitosa; de lo contrario, levanta una excepción.

    Proceso:
        - Intenta establecer una conexión con la base de datos utilizando `check_db_connection`.
        - Si falla la conexión, se levanta `DatabaseConnectionError` con un mensaje de error.
    """
    return establish_connection(
        check_db_connection, 
        "Error de conexión a la base de datos", 
        DatabaseConnectionError
    )


def establish_modbus_connection():
    """
    Establece una conexión con un dispositivo Modbus utilizando un puerto serie específico.

    Utiliza la función `establish_connection` para crear y configurar una instancia de 
    `minimalmodbus.Instrument`. Esta instancia se utiliza para interactuar con un dispositivo 
    Modbus a través de un puerto serie. En caso de error al configurar la conexión, se levanta
    una excepción `ModbusConnectionError`.

    Returns:
        Una instancia de `minimalmodbus.Instrument` configurada para comunicarse con el 
        dispositivo Modbus si la conexión es exitosa; de lo contrario, levanta una excepción.

    Proceso:
        - Intenta crear y configurar una instancia de `minimalmodbus.Instrument` usando el puerto
          serie especificado en `com_port` y la dirección del dispositivo en `device_address`.
        - Si falla la configuración del puerto serie, se levanta `ModbusConnectionError` con un
          mensaje de error.
    """
    return establish_connection(
        lambda: minimalmodbus.Instrument(com_port, device_address), 
        "Error al configurar el puerto serie", 
        ModbusConnectionError
    )

def establish_connection(connect_func, error_message, error_exception):
    """
    Intenta establecer una conexión o realizar una operación y maneja las excepciones.

    Esta función general se utiliza para intentar realizar cualquier operación que pueda lanzar
    una excepción. Captura excepciones genéricas y, en caso de error, imprime un mensaje de error
    personalizado y lanza una excepción específica.

    Args:
        connect_func (function): Función sin argumentos que intenta establecer una conexión o realizar una operación.
        error_message (str): Mensaje de error personalizado para mostrar si la operación falla.
        error_exception (Exception): Tipo de excepción a lanzar si la operación falla.

    Returns:
        El resultado de la función `connect_func` si la operación es exitosa.

    Raises:
        error_exception: Una excepción específica con un mensaje detallado si `connect_func` falla.

    Proceso:
        - Intenta ejecutar `connect_func`.
        - Si se produce una excepción, imprime `error_message` con detalles del error y lanza `error_exception`.
    """
    try:
        return connect_func()
    except Exception as e:
        print(f"{error_message}: {e}")
        raise error_exception(f"{error_message}. Detalles: {e}") from e

def process_digital_input(instrument, connection):
    """
    Procesa las entradas digitales de un dispositivo Modbus y actualiza la base de datos.

    Lee el estado de las entradas digitales del dispositivo Modbus especificado y actualiza
    la base de datos con estos valores. Se realizan lecturas para múltiples entradas digitales
    y se actualizan sus estados correspondientes en la base de datos.

    Args:
        instrument (minimalmodbus.Instrument): El instrumento Modbus utilizado para la lectura.
        connection (pymysql.connections.Connection): La conexión a la base de datos para la actualización.

    Procedimiento:
        - Lee el estado de la entrada digital 1 (D1) y actualiza su estado en la base de datos con la etiqueta "HR_INPUT1_STATE".
        - Repite el proceso para la entrada digital 2 (D2) con la etiqueta "HR_INPUT2_STATE".
    """
    process_input_and_update(instrument, connection, read_digital_input, D1, "HR_INPUT1_STATE")
    process_input_and_update(instrument, connection, read_digital_input, D2, "HR_INPUT2_STATE")
    

def process_input_and_update(instrument, connection, read_function, address, description):
    """
    Lee un valor de un dispositivo Modbus y actualiza la base de datos.

    Utiliza una función de lectura específica para obtener el estado o valor de una dirección
    específica en un dispositivo Modbus. Si se obtiene un valor válido (no None), actualiza
    la base de datos con este valor.

    Args:
        instrument (minimalmodbus.Instrument): El instrumento Modbus utilizado para la lectura.
        connection (pymysql.connections.Connection): Conexión a la base de datos para actualizar el valor.
        read_function (function): Función específica de lectura de Modbus que se utilizará.
        address (int): Dirección en el dispositivo Modbus desde la que leer.
        description (str): Descripción del valor leído, utilizada para la actualización en la base de datos.

    Proceso:
        - Utiliza la función de lectura para obtener el valor de la dirección específica del dispositivo Modbus.
        - Si se obtiene un valor (distinto de None), actualiza la base de datos con este valor y la descripción proporcionada.
    """
    state = read_function(instrument, address)
    if state is not None:
        update_database(connection, address, state, descripcion=description)


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

class DatabaseConnectionError(Exception):
    """Excepción para errores de conexión con la base de datos."""
    pass

main_loop()
