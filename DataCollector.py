#novus_usb_v0.py
import minimalmodbus
import time
import os
from datetime import datetime
from DataCollector_aux import detect_serial_ports, check_db_connection, read_digital_input, read_high_resolution_register, update_database, insert_database

seg = 1
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
        input("Presiona una tecla para salir")
        exit()

# Dirección del dispositivo Modbus (ajusta la dirección del dispositivo según tu configuración)
device_address = 1

# Entradas digitales
D1 = 70
D2 = 71
# Contador
HR_COUNTER1_LO = 22
HR_COUNTER1_HI = 23
HR_COUNTER2_LO = 24
HR_COUNTER2_HI = 25



while True:
    os.system('cls' if os.name == 'nt' else 'clear')

    # Realiza tus operaciones de lectura y actualización aquí.
    connection = check_db_connection()
    try:
        instrument = minimalmodbus.Instrument(com_port, device_address)
    except Exception as e:
        print("Error al configurar el puerto serie:", str(e))
        time.sleep(10)
        continue

    if connection:
        D1_state = read_digital_input(instrument, D1)
        HR_COUNTER1_lo, HR_COUNTER1_hi = read_high_resolution_register(instrument, HR_COUNTER1_LO, HR_COUNTER1_HI)
        if HR_COUNTER1_lo is not None and HR_COUNTER1_hi is not None:
            HR_COUNTER1 = HR_COUNTER1_lo + HR_COUNTER1_hi * 65536
        print(f"Puerto {device_description} detectado: {com_port}\n")


        if D1_state is not None:
            update_database(connection, D1, D1_state, descripcion="HR_INPUT1_STATE")

        if HR_COUNTER1_lo is not None and HR_COUNTER1_hi is not None:
            update_database(connection, HR_COUNTER1_LO, HR_COUNTER1_lo, descripcion="HR_COUNTER1_LO ")
            update_database(connection, HR_COUNTER1_HI, HR_COUNTER1_hi, descripcion="HR_COUNTER1_HI ")
            
        fecha_ahora = int(time.time())
        print(f"la hora es: {datetime.fromtimestamp(fecha_ahora)}")
        fecha_sig = ((int(time.time()) // 300 + 1) * 300)
        fecha_sig_formateada = datetime.fromtimestamp(fecha_sig)
        print(f"Próxima actualización a las {fecha_sig_formateada}")
        seg = fecha_sig - fecha_ahora
        seg_truncado = round(seg, 1)
        print(f"Tiempo para la siguiente actualización: {seg_truncado} segundos")
        fecha_ahora = round(fecha_ahora/300,1)*300


    if seg < 2:
        try:
            insert_database(connection, fecha_ahora, HR_COUNTER1)
            time.sleep(15)
        except Exception as e:  
            print("Error al insertar en la base de datos:", e)

    time.sleep(1)
