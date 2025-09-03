/*
Path: src/infrastructure/ui/chart_renderer.js
*/

// Importar dependencias necesarias
import ChartConfigService from '../../application/chart_config_service.js';
import HighchartsGateway from '../../interface_adapters/gateways/highcharts_gateway.js';

export default class ChartRenderer {
    constructor(chartController) {
        this.chartController = chartController;
        this.chartConfigService = new ChartConfigService();
    }

    /**
     * Renderiza el gráfico en el contenedor especificado
     * @param {string|HTMLElement} container - ID o elemento del contenedor
     * @param {Object} chartData - Datos para el gráfico
     * @param {BuildChartSeriesUseCase} buildChartSeriesUseCase - Caso de uso para construir las series
     */
    createChart(container, chartData, buildChartSeriesUseCase) {
        try {
            // Obtener series desde el caso de uso
            const series = buildChartSeriesUseCase.execute(chartData);
            // Obtener configuración desde el servicio de application
            const config = this.chartConfigService.getChartConfig({
                chartData,
                series,
                title: chartData?.conta ? Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", chartData.conta) : '',
                onClickHandler: this.chartController.eventManager.handleChartClick,
                onLoadHandler: this.chartController.eventManager.handleChartLoad
            });
            const chart = HighchartsGateway.createChart(container, config);
            if (chart) {
                return true;
            } else {
                throw new Error("HighchartsGateway no pudo crear el gráfico");
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
