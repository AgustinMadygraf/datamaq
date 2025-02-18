import time
from datetime import datetime
import subprocess
import pymysql
from src.logs.config_logger import configurar_logging
from src.db_operations import check_db_connection  

logger = configurar_logging()

def transfer_production_log():
    conn = check_db_connection()
    if not conn:
        logger.error("No se pudo establecer una conexión con la base de datos.")
        return
    with conn.cursor() as cursor:
        logger.info("Iniciando transferencia de ProductionLog.")
        unixtime = int(time.time())
        unixtime = (round(unixtime / 300)) * 300
        consulta1 = """ 
            SELECT 
                (SELECT valor FROM registros_modbus WHERE registro = 'HR_COUNTER1_LO') AS HR_COUNTER1_LO, 
                (SELECT valor FROM registros_modbus WHERE registro = 'HR_COUNTER1_HI') AS HR_COUNTER1_HI, 
                (SELECT valor FROM registros_modbus WHERE registro = 'HR_COUNTER2_LO') AS HR_COUNTER2_LO, 
                (SELECT valor FROM registros_modbus WHERE registro = 'HR_COUNTER2_HI') AS HR_COUNTER2_HI;
        """
        consulta2 = """
            INSERT INTO ProductionLog (unixtime, HR_COUNTER1_LO, HR_COUNTER1_HI, HR_COUNTER2_LO, HR_COUNTER2_HI)
            VALUES (%s, %s, %s, %s, %s)
        """
        num_filas = 5
        datos_originales = obtener_datos(cursor, consulta1)
        datos = [(unixtime,) + tuple(int(x) for x in fila) for fila in datos_originales] if datos_originales else []
        if datos:
            cursor.execute("SELECT COUNT(*) FROM intervalproduction WHERE unixtime = %s", (unixtime,))
            if cursor.fetchone()[0] == 0:
                insertar_datos(conn, datos, consulta2, num_filas)
                conn.commit()
                logger.info("Transferencia de ProductionLog completada exitosamente.")
            else:
                logger.warning("Registro duplicado para unixtime %s.", unixtime)
        else:
            logger.warning("No se obtuvieron datos para ProductionLog.")
    conn.close()

def transfer_interval_production():
    conn = check_db_connection()
    if not conn:
        logger.error("No se pudo establecer conexión para intervalproduction.")
        return
    with conn.cursor() as cursor:
        logger.info("Iniciando transferencia de intervalproduction.")
        unixtime = int(time.time())
        unixtime = (round(unixtime / 300)) * 300
        consulta1 = """
            SELECT 
                ((SELECT HR_COUNTER1_LO FROM ProductionLog ORDER BY ID DESC LIMIT 1) - 
                (SELECT HR_COUNTER1_LO FROM ProductionLog WHERE ID = (SELECT MAX(ID) - 1 FROM ProductionLog))) AS HR_COUNTER1,
                ((SELECT HR_COUNTER2_LO FROM ProductionLog ORDER BY ID DESC LIMIT 1) - 
                (SELECT HR_COUNTER2_LO FROM ProductionLog WHERE ID = (SELECT MAX(ID) - 1 FROM ProductionLog))) AS HR_COUNTER2
            FROM ProductionLog
            LIMIT 1;
        """
        consulta2 = """
            INSERT INTO intervalproduction (unixtime, HR_COUNTER1, HR_COUNTER2)
            VALUES (%s, %s, %s)
        """
        num_filas = 3
        datos_originales = obtener_datos(cursor, consulta1)
        datos = [(unixtime,) + tuple(int(x) for x in fila) for fila in datos_originales] if datos_originales else []
        if datos:
            cursor.execute("SELECT COUNT(*) FROM intervalproduction WHERE unixtime = %s", (unixtime,))
            if cursor.fetchone()[0] == 0:
                insertar_datos(conn, datos, consulta2, num_filas)
                conn.commit()
                logger.info("Transferencia de intervalproduction completada exitosamente.")
            else:
                logger.warning("Registro duplicado para unixtime %s.", unixtime)
        else:
            logger.warning("No se obtuvieron datos para intervalproduction.")
    conn.close()

def MainTransfer():
    if es_tiempo_cercano_multiplo_cinco():
        logger.info("Iniciando transferencia de datos.")
        transfer_production_log()
        transfer_interval_production()
        SendDataPHP()
        time.sleep(1)
    else:
        logger.info("No es momento de transferir datos. Esperando para la próxima verificación.")

def SendDataPHP():
    php_interpreter = "C://AppServ//php7//php.exe"
    php_script = "C://AppServ//www//DataMaq//includes//SendData_python.php"
    result = subprocess.run([php_interpreter, php_script], capture_output=True, text=True, shell=True)
    if result.returncode == 0:
        logger.info("Script PHP ejecutado exitosamente. Salida:")
        logger.info(result.stdout)
    else:
        logger.error(f"Error al ejecutar el script PHP. Código de salida: {result.returncode}")
        logger.error(result.stderr)

def transferir_datos(consulta1, consulta2, num_filas):
    print("")
    try:
        conn = check_db_connection()
        if not conn:
            logger.error("No se pudo establecer una conexión con la base de datos.")
            return
        with conn.cursor() as cursor:
            logger.info("Iniciando la transferencia de datos.")
            unixtime = int(time.time())
            unixtime = (round(unixtime / 300)) * 300
            datos_originales = obtener_datos(cursor, consulta1)
            datos = [(unixtime,) + tuple(int(x) for x in fila) for fila in datos_originales]
            if datos:
                cursor.execute("SELECT COUNT(*) FROM intervalproduction WHERE unixtime = %s", (unixtime,))
                if cursor.fetchone()[0] == 0:
                    insertar_datos(conn, datos, consulta2, num_filas)
                    conn.commit()
                    logger.info("Transferencia de datos completada exitosamente.")
                else:
                    logger.warning("Se evitó la inserción de un registro duplicado para el unixtime %s.", unixtime)
            else:
                logger.warning("No se obtuvieron datos para transferir.")
    except pymysql.MySQLError as e:
        logger.error(f"Error de MySQL durante la transferencia de datos: {e}")
        conn.rollback()
    except Exception as e:
        logger.error(f"Error inesperado durante la transferencia de datos: {e}")
        conn.rollback()
    finally:
        if conn:
            conn.close()
            logger.info("Conexión a la base de datos cerrada.")

def obtener_datos(cursor, consulta):
    try:
        cursor.execute(consulta)
        return cursor.fetchall()
    except pymysql.MySQLError as e:
        logger.error(f"Error de MySQL al ejecutar consulta: {e}")
    except Exception as e:
        logger.error(f"Error inesperado al ejecutar consulta: {e}")
    return None

def insertar_datos(conn, datos, consulta2, num_filas):
    try:
        with conn.cursor() as cursor:
            for fila in datos:
                if len(fila) == num_filas:
                    cursor.execute(consulta2, fila)
                else:
                    logger.warning("Fila con número incorrecto de elementos: %s", fila)
            conn.commit()
            logger.info("%s registros insertados con éxito.", len(datos))
    except pymysql.MySQLError as e:
        logger.error("Error de MySQL al insertar datos: %s", e)
        conn.rollback()
    except Exception as e:
        logger.error("Error inesperado al insertar datos: %s", e)
        conn.rollback()

def es_tiempo_cercano_multiplo_cinco(tolerancia=5):
    ahora = datetime.now()
    minuto_actual = ahora.minute
    segundo_actual = ahora.second
    cercano_a_multiplo = minuto_actual % 5 <= tolerancia / 60 and segundo_actual <= tolerancia
    logger.info(f"Chequeando tiempo: {ahora}, cercano a múltiplo de 5: {'sí' if cercano_a_multiplo else 'no'}")
    return cercano_a_multiplo
