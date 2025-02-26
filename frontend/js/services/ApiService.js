/*
Path: frontend/js/services/ApiService.js
Este servicio se encarga de hacer peticiones a la API del backend.
*/

class ApiService {
    /**
     * URL base para las peticiones API
     */
    static BASE_URL = '/DataMaq/backend/api';
    
    /**
     * Obtiene los datos del dashboard desde la API
     * @param {string} periodo - Periodo de tiempo (semana, turno, hora)
     * @param {number|null} conta - Timestamp para filtrar datos (opcional)
     * @returns {Promise<Object>} - Respuesta de la API
     */
    static async getDashboardData(periodo = 'semana', conta = null) {
        try {
            let url = `${this.BASE_URL}/dashboard.php?periodo=${periodo}`;
            
            if (conta !== null) {
                url += `&conta=${conta}`;
            }
            
            const response = await fetch(url, {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                }
            });
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error('Error en ApiService.getDashboardData:', error);
            return {
                status: 'error',
                message: error.message
            };
        }
    }
    
    /**
     * Envía datos al servidor
     * @param {string} endpoint - Endpoint de la API
     * @param {Object} data - Datos a enviar
     * @param {string} method - Método HTTP (POST, PUT, DELETE)
     * @returns {Promise<Object>} - Respuesta de la API
     */
    static async sendData(endpoint, data, method = 'POST') {
        try {
            const csrfToken = window.initialData?.csrfToken || '';
            
            const response = await fetch(`${this.BASE_URL}/${endpoint}`, {
                method,
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'X-CSRF-Token': csrfToken
                },
                body: JSON.stringify(data)
            });
            
            if (!response.ok) {
                throw new Error(`Error HTTP: ${response.status}`);
            }
            
            return await response.json();
        } catch (error) {
            console.error(`Error en ApiService.sendData (${endpoint}):`, error);
            return {
                status: 'error',
                message: error.message
            };
        }
    }
}

export default ApiService;