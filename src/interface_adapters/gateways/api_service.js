/*
Path: src/interface_adapters/gateways/api_service.js
*/

import appState from '../../application/app_state.js';

class ApiService {
    /**
     * URL base para las peticiones API
     */
    static BASE_URL = '/datamaq_php/backend/api';
    
    /**
     * Obtiene los datos del dashboard desde la API
     * @param {string} periodo - Periodo de tiempo (semana, turno, hora) - opcional, si no se especifica se obtiene del estado
     * @param {number|null} conta - Timestamp para filtrar datos (opcional) - opcional, si no se especifica se obtiene del estado
     * @returns {Promise<Object>} - Respuesta de la API
     */
    static async getDashboardData(periodo = null, conta = null) {
            try {
                appState.setLoading('dashboard', true);
                // Si no se proporcionan parámetros, intentar obtenerlos del estado
                if (periodo === null) {
                    const initialData = appState.getInitialData();
                    periodo = initialData.periodo || 'semana';
                }
                if (conta === null) {
                    const initialData = appState.getInitialData();
                    conta = initialData.conta;
                }
                let url = `${this.BASE_URL}/dashboard.php?periodo=${periodo}`;
                if (conta !== null) {
                    url += `&conta=${conta}`;
                }
                console.log(`ApiService - Obteniendo datos del dashboard: ${url}`);
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
                let result;
                try {
                    result = await response.json();
                } catch (jsonError) {
                    // Si la respuesta no es JSON válida, loguear y registrar error
                    const text = await response.text();
                    console.error('ApiService - Error al parsear JSON:', jsonError, 'Respuesta recibida:', text);
                    appState.addError('apiService', `Respuesta no válida: ${jsonError.message}`);
                    return {
                        status: 'error',
                        message: `Respuesta no válida: ${jsonError.message}`
                    };
                }
                if (result.status === 'success') {
                    appState.setChartData({
                        conta: result.data.conta,
                        rawdata: result.data.rawdata,
                        ls_periodos: result.data.ls_periodos,
                        menos_periodo: result.data.menos_periodo,
                        periodo: result.data.periodo
                    });
                    console.log("ApiService - Datos del dashboard obtenidos y guardados en estado:", result.data);
                } else {
                    appState.addError('apiService', `Error en la respuesta: ${result.message || 'Respuesta inesperada'}`);
                    console.warn('ApiService - Respuesta de error recibida:', result);
                }
                return result;
            } catch (error) {
                console.error('ApiService - Error en getDashboardData:', error);
                appState.addError('apiService', error);
                return {
                    status: 'error',
                    message: error.message
                };
            } finally {
                appState.setLoading('dashboard', false);
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
            const initialData = appState.getInitialData();
            const csrfToken = initialData.csrfToken || '';
            if (!csrfToken) {
                console.warn('ApiService - Token CSRF no disponible en el estado');
            }
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
            // Leer el body como texto primero
            const text = await response.text();
            let result;
            try {
                result = JSON.parse(text);
            } catch (jsonError) {
                console.error(`ApiService - Error al parsear JSON en sendData (${endpoint}):`, jsonError, 'Respuesta recibida:', text);
                appState.addError('apiService', `Respuesta no válida en ${endpoint}: ${jsonError.message}`);
                return {
                    status: 'error',
                    message: `Respuesta no válida en ${endpoint}: ${jsonError.message}`,
                    raw: text
                };
            }
            if (result.status !== 'success') {
                appState.addError('apiService', `Error en ${endpoint}: ${result.message || 'Error desconocido'}`);
                console.warn(`ApiService - Respuesta de error recibida en ${endpoint}:`, result);
            }
            return result;
        } catch (error) {
            console.error(`ApiService - Error en sendData (${endpoint}):`, error);
            appState.addError('apiService', `Error en ${endpoint}: ${error.message}`);
            return {
                status: 'error',
                message: error.message
            };
        }
    }
}

export default ApiService;