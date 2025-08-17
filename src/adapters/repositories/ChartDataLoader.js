/*
Path: src/adapters/repositories/ChartDataLoader.js
*/

import ApiService from '../../../js/services/ApiService.js';

export default class ChartDataLoader {
    constructor(chartController) {
        this.chartController = chartController;
        this.failedAttempts = 0;
        this.maxFailedAttempts = 5;
    }

    /**
     * Carga los datos del gráfico desde una fuente externa
     * @param {Object} initialData - Parámetros iniciales para la consulta
     * @returns {Promise<Object|null>} - Datos del gráfico o null si falla
     */
    async loadChartData(initialData) {
        try {
            console.log("ChartDataLoader - Cargando datos del gráfico");
            if (!initialData) {
                console.warn("ChartDataLoader - initialData no proporcionado");
                this.failedAttempts++;
                return null;
            }
            const periodo = initialData.periodo || 'semana';
            const conta = initialData.conta || null;
            const response = await ApiService.getDashboardData(periodo, conta);
            if (response && response.status === 'success') {
                // Retornar el formato esperado por ChartController
                return {
                    conta: response.data.conta,
                    rawdata: response.data.rawdata,
                    ls_periodos: response.data.ls_periodos,
                    menos_periodo: response.data.menos_periodo,
                    periodo: response.data.periodo
                };
            } else {
                console.error("ChartDataLoader - Error en la respuesta de la API:", response?.message);
                this.failedAttempts++;
                return null;
            }
        } catch (e) {
            console.error("ChartDataLoader - Error al cargar datos:", e);
            this.failedAttempts++;
            return null;
        }
    }
}
