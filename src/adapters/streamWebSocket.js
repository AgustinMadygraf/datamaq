export class StreamWebSocketHandler {
    constructor() {
        this.ws = null;
        this.reconnectAttempts = 0;
        this.maxReconnectAttempts = 5;
        this.reconnectTimeout = null;
    }

    connect() {
        try {
            const protocol = window.location.protocol === 'https:' ? 'wss:' : 'ws:';
            const wsUrl = `${protocol}//127.0.0.1:5000/ws`;
            
            this.ws = new WebSocket(wsUrl);
            
            this.ws.onopen = () => {
                console.log('WebSocket conectado');
                this.reconnectAttempts = 0;
                this.showNotification('Conexión establecida con el servidor', 'success');
            };
            
            this.ws.onmessage = (event) => {
                const data = JSON.parse(event.data);
                this.handleMessage(data);
            };
            
            this.ws.onclose = () => {
                console.log('WebSocket desconectado');
                this.tryReconnect();
            };
            
            this.ws.onerror = (error) => {
                console.error('Error de WebSocket:', error);
                this.showNotification('Error en la conexión con el servidor', 'danger');
            };
        } catch (error) {
            console.error('Error al conectar WebSocket:', error);
        }
    }
    
    handleMessage(data) {
        console.log('Mensaje recibido:', data);
        
        switch(data.event) {
            case 'status':
                this.showNotification('Estado del servidor: ' + data.message, 'info');
                break;
            
            case 'imagen_perdida':
                this.showNotification('Se ha perdido la conexión con la cámara', 'warning');
                // Actualizar la interfaz para mostrar que no hay stream
                document.getElementById('stream-img').classList.add('stream-lost');
                break;
                
            case 'imagen_recuperada':
                this.showNotification('Se ha restablecido la conexión con la cámara', 'success');
                // Actualizar la interfaz para mostrar que el stream está activo
                document.getElementById('stream-img').classList.remove('stream-lost');
                this.refreshStream();
                break;
                
            default:
                console.log('Evento desconocido:', data.event);
        }
    }
    
    refreshStream() {
        const streamImg = document.getElementById('stream-img');
        const currentSrc = streamImg.src;
        streamImg.src = '';
        setTimeout(() => {
            streamImg.src = currentSrc;
        }, 500);
    }
    
    tryReconnect() {
        if (this.reconnectAttempts < this.maxReconnectAttempts) {
            this.reconnectAttempts++;
            const delay = Math.min(30000, Math.pow(2, this.reconnectAttempts) * 1000);
            
            this.showNotification(`Intentando reconectar (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`, 'warning');
            
            this.reconnectTimeout = setTimeout(() => {
                console.log(`Intento de reconexión ${this.reconnectAttempts}...`);
                this.connect();
            }, delay);
        } else {
            this.showNotification('No se pudo reconectar al servidor después de varios intentos', 'danger');
        }
    }
    
    showNotification(message, type) {
        // Crear contenedor de notificaciones si no existe
        let notificationsContainer = document.getElementById('ws-notifications');
        if (!notificationsContainer) {
            notificationsContainer = document.createElement('div');
            notificationsContainer.id = 'ws-notifications';
            notificationsContainer.className = 'position-fixed top-0 end-0 p-3';
            notificationsContainer.style.zIndex = '1050';
            document.body.appendChild(notificationsContainer);
        }
        
        // Crear la notificación
        const notification = document.createElement('div');
        notification.className = `toast align-items-center text-white bg-${type} border-0`;
        notification.role = 'alert';
        notification.setAttribute('aria-live', 'assertive');
        notification.setAttribute('aria-atomic', 'true');
        
        notification.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">
                    ${message}
                </div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
            </div>
        `;
        
        notificationsContainer.appendChild(notification);
        
        // Inicializar y mostrar la notificación
        const toast = new bootstrap.Toast(notification, { autohide: true, delay: 5000 });
        toast.show();
        
        // Eliminar el elemento después de ocultarse
        notification.addEventListener('hidden.bs.toast', () => {
            notification.remove();
        });
    }
    
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
    }
}