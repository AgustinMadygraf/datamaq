#SCR/logs/config_logger.py
import logging
from logging.handlers import RotatingFileHandler
import datetime


class DebugAndAboveFilter(logging.Filter):
    def filter(self, record):
        # Excluir los registros de nivel INFO del archivo de log
        return record.levelno != logging.INFO

def create_handler(handler_class, level, format, **kwargs):
    handler = handler_class(**kwargs)
    handler.setLevel(level)
    handler.setFormatter(logging.Formatter(format))
    return handler

def configurar_logging():
    logger = logging.getLogger()
    if logger.hasHandlers():
        return logger

    log_format = '%(asctime)s - %(levelname)s - %(module)s - %(filename)s:%(lineno)d: %(message)s'
    log_file = 'SCR/logs/sistema.log'
    max_bytes = 10485760  # 10MB
    backup_count = 5

    file_handler = create_handler(
        RotatingFileHandler, 
        logging.DEBUG, 
        log_format, 
        filename=log_file, 
        maxBytes=max_bytes, 
        backupCount=backup_count
    )
    file_handler.addFilter(DebugAndAboveFilter())  # Aplicar el filtro

    console_handler = create_handler(
        logging.StreamHandler, 
        logging.INFO, 
        log_format
    )

    logger.setLevel(logging.DEBUG)  # Nivel más bajo para capturar todos los mensajes
    logger.addHandler(file_handler)
    logger.addHandler(console_handler)

    return logger

# Configurar el logger con un nivel específico
configurar_logging()
