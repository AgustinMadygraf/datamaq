#src/DataTranfer.py
import time
from datetime import datetime
from src.logs.config_logger import configurar_logging
from src.db_operations import check_db_connection  
import pymysql
import subprocess

# Las funciones MainTransfer, SendDataPHP, transferir_datos, obtener_datos,
# insertar_datos y es_tiempo_cercano_multiplo_cinco se han movido a /c:/AppServ/www/DataMaq/data_transfer.py
# y las funciones sincronizar_intervalproduction y obtener_ultimo_registro se han movido a /c:/AppServ/www/DataMaq/db_sync.py.
# Se mantiene este archivo para compatibilidad o se elimina según convenga.
