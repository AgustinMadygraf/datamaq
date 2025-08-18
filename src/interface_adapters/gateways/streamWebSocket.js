/*
Path: src/interface_adapters/gateways/streamWebSocket.js
*/

import { showNotification, setStreamLost, setStreamRecovered } from '../presenters/notificationPresenter.js';

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
                showNotification('Conexión establecida con el servidor', 'success');
            };
            
            this.ws.onmessage = (event) => {
                let data;
                try {
                    data = JSON.parse(event.data);
                } catch (e) {
                    console.warn('Mensaje WebSocket no es JSON:', event.data);
                    return; // Ignora mensajes no JSON
                }
                this.handleMessage(data);
            };
            
            this.ws.onclose = () => {
                console.log('WebSocket desconectado');
                this.tryReconnect();
            };
            
            this.ws.onerror = (error) => {
                console.error('Error de WebSocket:', error);
                showNotification('Error en la conexión con el servidor', 'danger');
            };
        } catch (error) {
            console.error('Error al conectar WebSocket:', error);
        }
    }
    
    handleMessage(data) {
        console.log('Mensaje recibido:', data);
        
        switch(data.event) {
            case 'status':
                showNotification('Estado del servidor: ' + data.message, 'info');
                break;
            case 'imagen_perdida':
                showNotification('Se ha perdido la conexión con la cámara', 'warning');
                setStreamLost();
                break;
            case 'imagen_recuperada':
                showNotification('Se ha restablecido la conexión con la cámara', 'success');
                setStreamRecovered();
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
            
            showNotification(`Intentando reconectar (${this.reconnectAttempts}/${this.maxReconnectAttempts})...`, 'warning');
            
            this.reconnectTimeout = setTimeout(() => {
                console.log(`Intento de reconexión ${this.reconnectAttempts}...`);
                this.connect();
            }, delay);
        } else {
            showNotification('No se pudo reconectar al servidor después de varios intentos', 'danger');
        }
    }
    
    // ...eliminado: showNotification, ahora se usa el presenter
    
    disconnect() {
        if (this.ws) {
            this.ws.close();
        }
        if (this.reconnectTimeout) {
            clearTimeout(this.reconnectTimeout);
        }
    }
}