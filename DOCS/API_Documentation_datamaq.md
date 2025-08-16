# Documentación de la API

## Resumen
Este documento describe la arquitectura centralizada de la API, que utiliza respuestas estandarizadas para éxito y error.

## Endpoints

### /dashboard
- **Método:** GET
- **Descripción:** Devuelve los datos del dashboard en formato JSON.  
  Nota: Se debe incluir el header `Accept: application/json` para asegurar que la respuesta sea en formato JSON.
- **Formato de Respuesta Éxito:**  
  {
      "status": "success",
      "data": { ... }
  }
- **Formato de Respuesta Error:**  
  {
      "status": "error",
      "message": "mensaje de error",
      "code": 500
  }

### /test
- **Método:** GET
- **Descripción:** Devuelve datos de prueba en formato JSON.
- **Formato de Respuesta:**  
  {
      "status": "success",
      "data": { ... }
  }

## Uso
1. Realizar la llamada HTTP utilizando el método correcto.
2. Incluir el header `Accept: application/json` para asegurar la respuesta en formato JSON.
3. Verificar la estructura de la respuesta, utilizando el campo `status` para determinar éxito o error, y el campo `message` en caso de fallo.
