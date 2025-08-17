/*
Path: src/use_cases/build_chart_config.js
*/

import ChartConfig from '../entities/chart_config.js';

export default class BuildChartConfigUseCase {
    constructor() {}

    execute({ chartData, series, title, onClickHandler, onLoadHandler }) {
        // Puedes personalizar la configuración según reglas de negocio
        const config = new ChartConfig({
            type: 'spline',
            animation: false,
            marginRight: 10,
            lang: {
                thousandsSep: '',
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            },
            title: title || '',
            xAxis: { type: 'datetime', tickPixelInterval: 1 },
            yAxis: {
                title: { text: '[Producción]' },
                plotLines: [{ value: 0, width: 1, color: '#808080' }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                        Highcharts.dateFormat('%A, %d %B %Y - %H:%M:%S', this.x) + '<br/>' +
                        Highcharts.numberFormat(this.y, 1) + '  Unidades por minuto';
                }
            },
            legend: { enabled: true },
            exporting: { enabled: true },
            series: series
        });
        return config.toHighchartsConfig(onClickHandler, onLoadHandler);
    }
}
