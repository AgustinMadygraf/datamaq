/*
Path: frontend/js/services/ApiService.js
*/

class ApiService {
    static API_BASE_URL = '/DataMaq/backend/api/endpoints';

    /**
     * Obtiene datos del estado actual del equipo
     * @returns {Promise<Object>} Datos del estado
     */
    static async getStatusData() {
        try {
            const response = await fetch(`${this.API_BASE_URL}/DashboardEndpoint.php`);
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const text = await response.text();
            if (!text) {
                throw new Error('Empty response from API');
            }
            return JSON.parse(text);
        } catch (error) {
            console.error('Error en ApiService.getStatusData:', error);
            throw error;
        }
    }
}

export default ApiService;