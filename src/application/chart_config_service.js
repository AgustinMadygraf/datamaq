/*
Path: src/application/chart_config_service.js
*/

import BuildChartConfigUseCase from '../use_cases/build_chart_config.js';

export default class ChartConfigService {
    constructor() {
        this.buildChartConfigUseCase = new BuildChartConfigUseCase();
    }

    /**
     * Obtiene la configuración del gráfico usando el caso de uso
     * @param {Object} params - Parámetros para la configuración
     * @returns {Object} Configuración para Highcharts
     */
    getChartConfig(params) {
        return this.buildChartConfigUseCase.execute(params);
    }
}
