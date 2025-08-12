/*
ChartRenderer.js
Responsable de la renderización y configuración del gráfico Highcharts.
*/

// Importar dependencias necesarias
import HighchartsConfig from './HighchartsConfig.js';
// Asume que Highcharts está disponible globalmente

export default class ChartRenderer {
    constructor(chartController) {
        this.chartController = chartController;
    }

    /**
     * Renderiza el gráfico en el contenedor especificado
     * @param {string|HTMLElement} container - ID o elemento del contenedor
     * @param {Object} chartData - Datos para el gráfico
     */
    createChart(container, chartData) {
        try {
            console.log("ChartRenderer - Creando gráfico...");
            // Obtener series desde SeriesBuilder
            const series = this.chartController.seriesBuilder.buildSeries(chartData);
            // Obtener configuración desde HighchartsConfig
            const config = HighchartsConfig.getChartConfig(
                chartData,
                series,
                this.chartController.eventManager.handleChartClick,
                this.chartController.eventManager.handleChartLoad
            );
            if (typeof Highcharts !== 'undefined') {
                Highcharts.chart(container, config);
                console.log("ChartRenderer - Renderizado de Highcharts completado");
                return true;
            } else {
                throw new Error("Highcharts no está definido");
            }
        } catch (e) {
            console.error("ChartRenderer - Error crítico en createChart:", e);
            // Fallback: mostrar mensaje de error en el contenedor
            if (container && typeof container.innerHTML === 'string') {
                container.innerHTML = '<div class="alert alert-danger">Error al cargar el gráfico</div>';
            }
            return false;
        }
    }
}
