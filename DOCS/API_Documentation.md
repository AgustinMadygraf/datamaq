# Documentación de la API

## Resumen
Este documento describe la arquitectura centralizada de la API, que utiliza respuestas estandarizadas para éxito y error.

## Endpoints

### /dashboard
- **Método:** GET
- **Descripción:** Devuelve los datos del dashboard en formato JSON.
- **Formato de Respuesta Éxito:**  
  `{"status": "success", "data": { ... }}`
- **Formato de Respuesta Error:**  
  `{"status": "error", "message": "mensaje de error", "code": 500}`

### /test
- **Método:** GET
- **Descripción:** Devuelve datos de prueba en formato JSON.
- **Formato de Respuesta:**  
  `{"status": "success", "data": { ... }}`

## Uso
1. Llamar a la API con el método HTTP correcto.
2. Verificar que la respuesta esté estandarizada.
3. Utilizar los mensajes de error para depuración y manejo de fallos.
