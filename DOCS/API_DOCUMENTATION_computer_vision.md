# Documentación de la API Backend

## Descripción General

Este backend permite exponer el stream de una cámara IP, obtener snapshots, consultar la resolución y recibir notificaciones en tiempo real sobre el estado del stream. Soporta los frameworks Flask y FastAPI, y está diseñado siguiendo principios de arquitectura limpia.

---

## Endpoints HTTP

### 1. Página principal
- **URL:** `/`
- **Método:** GET
- **Descripción:** Devuelve la página principal con el stream MJPEG embebido.
- **Respuesta:** HTML

### 2. Stream MJPEG
- **URL:** `/stream.mjpg`
- **Método:** GET
- **Descripción:** Devuelve el stream de video en formato MJPEG.
- **Respuesta:** `multipart/x-mixed-replace; boundary=frame`
- **Uso en frontend:**  
  `<img src="/stream.mjpg" alt="Stream" />`

### 3. Resolución del stream
- **URL:** `/resolution`
- **Método:** GET
- **Descripción:** Devuelve la resolución actual del stream de video.
- **Respuesta:** JSON  
  `{ "width": 1280, "height": 720 }`

### 4. Snapshot
- **URL:** `/snapshot.jpg`
- **Método:** GET
- **Descripción:** Toma un snapshot del stream y lo devuelve como imagen JPEG.
- **Respuesta exitosa:** `image/jpeg`
- **Respuesta de error:**  
  - Código 503, texto plano: `No se pudo capturar frame`
- **Ejemplo de uso en frontend:**
  ```js
  fetch('/snapshot.jpg')
    .then(res => res.blob())
    .then(blob => {
      const url = URL.createObjectURL(blob);
      document.getElementById('snapshot').src = url;
    });
  ```

---

## Endpoint WebSocket

### 5. Notificaciones en tiempo real
- **URL:** `/ws`
- **Protocolo:** WebSocket
- **Descripción:** Permite recibir notificaciones automáticas sobre el estado del stream (por ejemplo, pérdida o recuperación de imagen).
- **Eventos enviados:**
  - `status`: Conexión exitosa.
  - `imagen_perdida`: El stream se ha caído.
  - `imagen_recuperada`: El stream se ha restablecido.
- **Ejemplo de conexión en frontend (JavaScript):**
  ```js
  const ws = new WebSocket('ws://localhost:5000/ws');
  ws.onmessage = (event) => {
    const data = JSON.parse(event.data);
    if (data.event === 'imagen_perdida') {
      // Mostrar alerta o intentar reconectar
    }
    if (data.event === 'imagen_recuperada') {
      // Refrescar stream
    }
  };
  ```

---

## Flujo de integración recomendado

1. El frontend solicita `/resolution` para conocer el tamaño del video.
2. Muestra el stream embebiendo `/stream.mjpg` en un `<img>`.
3. Permite al usuario tomar snapshots solicitando `/snapshot.jpg`.
4. Se conecta al WebSocket `/ws` para recibir notificaciones en tiempo real sobre el estado del stream.

---

## Manejo de errores

- Si la cámara no está disponible, los endpoints pueden devolver errores HTTP (503 en `/snapshot.jpg`).
- El frontend debe manejar estos errores y mostrar mensajes adecuados al usuario.
- El WebSocket permite notificar automáticamente al frontend sobre eventos críticos.

---

## CORS

- El backend implementa CORS para permitir el acceso desde otros dominios.
- Si el frontend se sirve desde un dominio diferente, asegúrate de que CORS esté habilitado.

---

## Reglas de negocio

- El stream y los snapshots requieren que la cámara esté conectada y configurada.
- No hay autenticación implementada actualmente.
- El backend soporta una sola cámara IP por instancia.

---

## Notas técnicas

- Backend desarrollado en Python con Flask y FastAPI.
- Arquitectura desacoplada y extensible.
- Los snapshots se generan en tiempo real y no se almacenan en disco.
- El adaptador HTTP y los controladores están desacoplados de la lógica de negocio.
- Soporte para notificaciones en tiempo real vía WebSocket.
