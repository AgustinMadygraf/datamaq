
logger = configurar_logging()

def sincronizar_intervalproduction():
    try:
        logger.info("Iniciando la sincronización de 'intervalproduction'.")
        # Establecer conexión con la base de datos local
        conn_local = check_db_connection(remote=False)
        logger.info("Conexión establecida con la base de datos local.")
        # Establecer conexión con la base de datos remota
        conn_remota = check_db_connection(remote=True)
        logger.info("Conexión establecida con la base de datos remota.")
        with conn_local.cursor() as cursor_local, conn_remota.cursor() as cursor_remoto:
            logger.info("Cursore para ambas bases de datos creados.")
            logger.info("Obteniendo el último registro de la base de datos local.")
            ultimo_registro_local = obtener_ultimo_registro(cursor_local)
            logger.info(f"Último registro local: {ultimo_registro_local}")
            logger.info("Obteniendo el último registro de la base de datos remota.")
            ultimo_registro_remoto = obtener_ultimo_registro(cursor_remoto)
            logger.info(f"Último registro remoto: {ultimo_registro_remoto}")
            if ultimo_registro_local != ultimo_registro_remoto:
                logger.info("Las bases de datos no están sincronizadas. Iniciando sincronización.")
                # Código para sincronizar los registros...
                pass
            else:
                logger.info("Las bases de datos ya están sincronizadas.")
    except Exception as e:
        logger.error(f"Error en la sincronización de las bases de datos: {e}")

def obtener_ultimo_registro(cursor):
    try:
        consulta = "SELECT * FROM intervalproduction ORDER BY ID DESC LIMIT 1"
        cursor.execute(consulta)
        registro = cursor.fetchone()
        logger.info(f"Consulta ejecutada exitosamente. Registro obtenido: {registro}")
        return registro
    except Exception as e:
        logger.error(f"Error al obtener el último registro: {e}")
        raise

# Nota: Asegúrese de importar o definir la función check_db_connection si 
# es necesario en este módulo.
