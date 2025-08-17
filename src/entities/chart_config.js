/*
Path: src/entities/chart_config.js
*/

export default class ChartConfig {
    constructor({ type = 'spline', animation = false, marginRight = 10, lang = {}, title = '', xAxis = {}, yAxis = {}, tooltip = {}, legend = {}, exporting = {}, series = [] } = {}) {
        this.type = type;
        this.animation = animation;
        this.marginRight = marginRight;
        this.lang = lang;
        this.title = title;
        this.xAxis = xAxis;
        this.yAxis = yAxis;
        this.tooltip = tooltip;
        this.legend = legend;
        this.exporting = exporting;
        this.series = series;
    }

    // Método para obtener la configuración en formato Highcharts
    toHighchartsConfig(onClickHandler, onLoadHandler) {
        return {
            chart: {
                type: this.type,
                animation: this.animation,
                marginRight: this.marginRight,
                events: {
                    load: onLoadHandler,
                    click: onClickHandler
                }
            },
            title: {
                text: this.title,
                events: {
                    click: onClickHandler
                }
            },
            xAxis: this.xAxis,
            yAxis: this.yAxis,
            tooltip: this.tooltip,
            legend: this.legend,
            exporting: this.exporting,
            series: this.series,
            lang: this.lang
        };
    }
}
