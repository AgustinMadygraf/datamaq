import pymysql

# Configuración de la conexión a la base de datos
config = {
    'host': 'localhost',
    'user': 'root',
    'password': '12345678',
    'db': 'novus',
    'charset': 'utf8mb4',
    'cursorclass': pymysql.cursors.DictCursor
}

def restituir_registros():
    try:
        connection = pymysql.connect(**config)
        with connection.cursor() as cursor:
            # Obtener todos los registros de `productionlog` ordenados por `unixtime`
            cursor.execute("SELECT * FROM productionlog ORDER BY unixtime")
            registros = cursor.fetchall()
            
            for i, registro_actual in enumerate(registros):
                if i == 0:  # Saltar el primer registro para evitar índice negativo
                    continue
                
                # Calcular diferenciales de contadores respecto al registro anterior (5 minutos antes)
                registro_anterior = registros[i-1]
                diff_hr_counter1 = registro_actual['HR_COUNTER1_LO'] - registro_anterior['HR_COUNTER1_LO']
                diff_hr_counter2 = registro_actual['HR_COUNTER2_LO'] - registro_anterior['HR_COUNTER2_LO']
                
                # Verificar si ya existe un registro en `intervalproduction` para el `unixtime` actual
                cursor.execute("SELECT COUNT(*) AS count FROM intervalproduction WHERE unixtime = %s", (registro_actual['unixtime'],))
                existe = cursor.fetchone()['count'] > 0
                
                if not existe:
                    # Insertar nuevo registro en `intervalproduction` con los diferenciales calculados
                    sql_insert = """
                        INSERT INTO intervalproduction (unixtime, HR_COUNTER1, HR_COUNTER2)
                        VALUES (%s, %s, %s)
                    """
                    cursor.execute(sql_insert, (registro_actual['unixtime'], diff_hr_counter1, diff_hr_counter2))
                    print(f"Restituido registro para unixtime {registro_actual['unixtime']} con diferenciales de contadores.")
            
            # Confirmar los cambios en la base de datos
            connection.commit()
            
    except pymysql.MySQLError as e:
        print(f"Error de conexión a la base de datos: {e}")
    finally:
        if connection:
            connection.close()

# Ejecutar la función para restituir registros
restituir_registros()
