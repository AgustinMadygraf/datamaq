#SCR/logs/config_logger.py
import logging
from logging.handlers import RotatingFileHandler
import datetime


class DebugAndAboveFilter(logging.Filter):
    def filter(self, record):
        # Excluir los registros de nivel INFO del archivo de log
        return record.levelno != logging.INFO

def configurar_logging():
    logger = logging.getLogger()
    if logger.hasHandlers():
        return logger

    # Configuración básica
    filename = 'SCR/logs/sistema.log'
    format = '%(asctime)s - %(levelname)s - %(module)s - %(filename)s:%(lineno)d: %(message)s'
    maxBytes = 10485760  # 10MB
    backupCount = 5
    formatter = logging.Formatter(format)

    # File Handler con filtro para excluir INFO
    file_handler = RotatingFileHandler(filename, maxBytes=maxBytes, backupCount=backupCount)
    file_handler.addFilter(DebugAndAboveFilter())  # Aplicar el filtro
    file_handler.setLevel(logging.DEBUG)
    file_handler.setFormatter(formatter)

    # Console Handler para INFO y superiores
    console_handler = logging.StreamHandler()
    console_handler.setLevel(logging.INFO)
    console_handler.setFormatter(formatter)

    logger.setLevel(logging.DEBUG)  # Nivel más bajo para capturar todos los mensajes
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    logger.debug("\n\n--------------- Nueva Sesión - {} - Nivel de Registro: {} ---------------\n\n".format(
        datetime.datetime.now().strftime("%Y-%m-%d %H:%M:%S"), logging.getLevelName(logger.getEffectiveLevel())))

    return logger

# Configurar el logger con un nivel específico
configurar_logging()
