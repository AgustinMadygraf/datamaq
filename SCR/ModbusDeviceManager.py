# ModbusDeviceManager.py

import minimalmodbus
from DatabaseOperations import detect_serial_ports

def detect_com_port(descriptions):
    for desc in descriptions:
        port = detect_serial_ports(desc)
        if port:
            print(f"Puerto {desc} detectado: {port}\n")
            return port, desc
    print("No se detectaron puertos COM para tu dispositivo.")
    return None, None

def initialize_modbus_device(DEVICE_DESCRIPTIONS):
    com_port, device_description = detect_com_port(DEVICE_DESCRIPTIONS)
    if com_port is None:
        input("Presiona una tecla para salir")
        exit()
    return com_port, device_description

def configure_modbus_instrument(com_port, device_address,device_description):
    try:
        instrument = minimalmodbus.Instrument(com_port, device_address)
        print(f"Puerto {device_description} detectado: {com_port}\n")
        return instrument
    except Exception as e:
        print("Error al configurar el puerto serie:", str(e))
        return None