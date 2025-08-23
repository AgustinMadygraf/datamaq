// src/interface_adapters/gateways/highcharts_gateway.js
// Gateway para encapsular el uso de Highcharts

export default class HighchartsGateway {
    /**
     * Crea y renderiza un gráfico usando Highcharts
     * @param {string|HTMLElement} container - ID o elemento del contenedor
     * @param {Object} config - Configuración para Highcharts
     * @returns {Object|null} - Instancia de Highcharts o null si falla
     */
    createChart(container, config) {
        if (typeof Highcharts === 'undefined') {
            console.error('HighchartsGateway - Highcharts no está disponible');
            return null;
        }
        try {
            return Highcharts.chart(container, config);
        } catch (e) {
            console.error('HighchartsGateway - Error al crear el gráfico:', e);
            return null;
        }
    }

    /**
     * Actualiza el gráfico existente con nuevos datos
     * @param {Object} chart - Instancia de Highcharts
     * @param {Object} newData - Nuevos datos para actualizar
     */
    updateChart(chart, newData) {
        if (!chart) return;
        // Implementar lógica de actualización según la API de Highcharts
        // Ejemplo: chart.update(newData)
        try {
            chart.update(newData);
        } catch (e) {
            console.error('HighchartsGateway - Error al actualizar el gráfico:', e);
        }
    }

    /**
     * Destruye el gráfico existente
     * @param {Object} chart - Instancia de Highcharts
     */
    destroyChart(chart) {
        if (chart && typeof chart.destroy === 'function') {
            chart.destroy();
        }
    }
}
