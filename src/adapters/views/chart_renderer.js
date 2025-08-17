/*
Path: src/adapters/views/ChartRenderer.js
*/

// Importar dependencias necesarias
import BuildChartConfigUseCase from '../../use_cases/build_chart_config.js';
// Asume que Highcharts está disponible globalmente

export default class ChartRenderer {
    constructor(chartController) {
        this.chartController = chartController;
        this.buildChartConfigUseCase = new BuildChartConfigUseCase();
    }

    /**
     * Renderiza el gráfico en el contenedor especificado
     * @param {string|HTMLElement} container - ID o elemento del contenedor
     * @param {Object} chartData - Datos para el gráfico
     * @param {BuildChartSeriesUseCase} buildChartSeriesUseCase - Caso de uso para construir las series
     */
    createChart(container, chartData, buildChartSeriesUseCase) {
        try {
            console.log("ChartRenderer - Creando gráfico...");
            // Obtener series desde el caso de uso
            const series = buildChartSeriesUseCase.execute(chartData);
            // Obtener configuración desde el caso de uso
            const config = this.buildChartConfigUseCase.execute({
                chartData,
                series,
                title: chartData?.conta ? Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", chartData.conta) : '',
                onClickHandler: this.chartController.eventManager.handleChartClick,
                onLoadHandler: this.chartController.eventManager.handleChartLoad
            });
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
