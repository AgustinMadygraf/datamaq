#SCR/InstrumentDataReaders.py
def read_digital_input(instrument, address):
    if instrument:
        try:
            result = instrument.read_bit(address, functioncode=2)
            return result
        except Exception as e:
            print(f"Error al leer entrada digital en registro {address}: {e}")
    return None

def read_high_resolution_register(instrument, address_lo, address_hi):
    if instrument:
        try:
            value_lo = instrument.read_register(address_lo, functioncode=3)
            value_hi = instrument.read_register(address_hi, functioncode=3)
            return value_lo, value_hi
        except Exception as e:
            print(f"Error al leer registro de alta resolución en registros {address_lo} y {address_hi}: {e}")
    return None, None



