#SCR/DataTranfer.py
import time
from datetime import datetime
from logs.config_logger import configurar_logging
from db_operations import check_db_connection  


logger = configurar_logging()

def es_tiempo_cercano_multiplo_cinco(tolerancia=5):
    """
    Verifica si el tiempo actual está cerca de un múltiplo de 5 minutos.

    Args:
        tolerancia (int): Número de segundos de tolerancia para considerar 'cercano'.

    Returns:
        bool: True si el tiempo actual está dentro de la tolerancia de un múltiplo de 5 minutos, False de lo contrario.
    """
    ahora = datetime.now()
    minuto_actual = ahora.minute
    segundo_actual = ahora.second

    cercano_a_multiplo = minuto_actual % 5 <= tolerancia / 60 and segundo_actual <= tolerancia

    # Registrar el chequeo y el resultado
    logger.info(f"Chequeando tiempo: {ahora}, cercano a múltiplo de 5: {'sí' if cercano_a_multiplo else 'no'}")

    return cercano_a_multiplo

def transferir_datos():
    """
    Transfiere datos desde la tabla 'registros_modbus' a 'maq_bolsas'.

    Establece una conexión con la base de datos y transfiere los registros relevantes
    desde 'registros_modbus' a 'maq_bolsas'. Registra cada paso del proceso para
    facilitar el seguimiento y la depuración.
    """
    conn = check_db_connection()  
    try:
        with conn.cursor() as cursor:
            logger.info("Iniciando la transferencia de datos.")

            # Obtener los datos de 'registros_modbus'
            cursor.execute("SELECT unixtime, HR_COUNTER1_LO, HR_COUNTER1_HI, HR_COUNTER2_LO, HR_COUNTER2_HI FROM registros_modbus")
            datos = cursor.fetchall()

            # Insertar los datos en 'maq_bolsas'
            for fila in datos:
                cursor.execute("""
                    INSERT INTO maq_bolsas (unixtime, HR_COUNTER1_LO, HR_COUNTER1_HI, HR_COUNTER2_LO, HR_COUNTER2_HI)
                    VALUES (%s, %s, %s, %s, %s)
                """, fila)
            conn.commit()
            logger.info("Transferencia de datos completada exitosamente.")

    except Exception as e:
        logger.error(f"Error durante la transferencia de datos: {e}")
        conn.rollback()  # Deshacer cambios en caso de error
    finally:
        conn.close()
        logger.info("Conexión a la base de datos cerrada.")


def MainTransfer():
    """
    Ejecuta un bucle continuo que verifica cada minuto si es el momento adecuado para
    transferir datos y, si es así, realiza la transferencia.
    """
    try:
        if es_tiempo_cercano_multiplo_cinco():
            logger.info("Iniciando la transferencia de datos.")
            transferir_datos()
        else:
            logger.info("No es momento de transferir datos. Esperando para la próxima verificación.")
    except Exception as e:
        logger.error(f"Error en main_loop: {e}")
    
    time.sleep(1)  # Espera un minuto antes de volver a verificar

