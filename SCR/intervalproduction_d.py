import csv
import pymysql
from SCR.db_operations import check_db_connection, execute_query

# Ruta al archivo CSV
csv_file_path = r'C:\AppServ\www\DigiRail\intervalproduction_d.csv'

def load_csv_to_mysql(csv_path):
    # Establecer conexión a la base de datos
    connection = check_db_connection()
    if connection is None:
        print("Error al conectar con la base de datos.")
        return
    
    # Abrir el archivo CSV
    with open(csv_path, mode='r', encoding='utf-8') as csvfile:
        csvreader = csv.DictReader(csvfile)
        for row in csvreader:
            # Asegurarse de corregir los nombres de las columnas según el archivo CSV
            fecha = row['Fecha']
            hr_counter1 = row['HR_COUNTER1']
            hr_counter2 = row['HR_COUNTER2']
            
            # Preparar la sentencia SQL
            query = "INSERT INTO intervalproduction_d (Fecha, HR_COUNTER1, HR_COUNTER2) VALUES (%s, %s, %s)"
            params = (fecha, hr_counter1, hr_counter2)
            
            # Ejecutar la consulta
            if not execute_query(connection, query, params):
                print(f"Error al insertar el registro {fecha, hr_counter1, hr_counter2}")
    
    # Cerrar la conexión
    connection.close()

# Llamada a la función
load_csv_to_mysql(csv_file_path)
