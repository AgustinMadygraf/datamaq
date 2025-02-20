/*
Path: JS/chart_viewer.js
Este script se encarga de generar el gráfico de Highcharts y de manejar el evento de doble click sobre el gráfico.
El gráfico se genera con los datos inyectados desde index.php, y el evento de doble click se encarga de hacer zoom en el gráfico.
*/

(function() {
    var doubleClicker = {
        clickedOnce: false,
        timer: null,
        timeBetweenClicks: 400
    };

    function resetDoubleClick () {
        clearTimeout(doubleClicker.timer);
        doubleClicker.timer = null;
        doubleClicker.clickedOnce = false;
    }

    function zoomIn (event) {
        // Obtener valores de window.chartData
        var periodo = window.chartData.periodo;
        var ls_periodos = window.chartData.ls_periodos;
        var menos_periodo = window.chartData.menos_periodo;
        var tiempo = Highcharts.numberFormat(event.xAxis[0].value + (ls_periodos[menos_periodo[periodo]] / 2));
        // Generar URL con el nuevo periodo (a ajustar según la lógica de la aplicación)
        window.open(window.location.pathname + '?periodo=' + menos_periodo[periodo] + '&conta=' + tiempo, "_self");
    }

    function ondbclick (event) {
        if (doubleClicker.clickedOnce && doubleClicker.timer) {
            resetDoubleClick();
            zoomIn(event);
        } else {
            doubleClicker.clickedOnce = true;
            doubleClicker.timer = setTimeout(resetDoubleClick, doubleClicker.timeBetweenClicks);
        }
    }
    
    document.addEventListener('DOMContentLoaded', function() {
        Highcharts.setOptions({
            global: { useUTC: false },
            lang: {
                thousandsSep: "",
                months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
            }
        });

        var chartData = window.chartData; // Datos inyectados desde index.php

        Highcharts.chart('container', {
            chart: {
                type: 'spline',
                animation: false,
                marginRight: 10,
                events: {
                    load: function () { /* ...existing code... */ },
                    click: function (event) { ondbclick(event); }
                }
            },
            title: {
                text: Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", chartData.conta),
                events: {
                    click: function (event) { ondbclick(event); }
                }
            },
            xAxis: { type: 'datetime', tickPixelInterval: 1 },
            yAxis: {
                title: { text: '[Producción]' },
                plotLines: [{ value: 0, width: 1, color: '#808080' }]
            },
            tooltip: {
                formatter: function () {
                    return '<b>' + this.series.name + '</b><br/>' +
                           Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", this.x) + '<br/>' +
                           Highcharts.numberFormat(this.y, 1) + '  Unidades por minuto';
                }
            },
            legend: { enabled: true },
            exporting: { enabled: true },
            series: [
                {
                    name: 'Sensor inductivo',
                    animation: false,
                    data: (function () {
                        var data = [];
                        chartData.rawdata.forEach(function(point, index) {
                            if(index > 0) {
                                data.push([1000 * point.unixtime, point.HR_COUNTER1 / 5]);
                            }
                        });
                        return data;
                    })()
                },
                {
                    name: 'Sensor optico',
                    animation: false,
                    data: (function () {
                        var data = [];
                        chartData.rawdata.forEach(function(point, index) {
                            if(index > 0) {
                                data.push([1000 * point.unixtime, point.HR_COUNTER2 / 5]);
                            }
                        });
                        return data;
                    })()
                },
                {
                    name: 'marcha',
                    animation: false,
                    data: (function () {
                        var data = [];
                        chartData.rawdata.forEach(function(point, index) {
                            if(index > 0) {
                                data.push([1000 * point.unixtime, 20]);
                            }
                        });
                        return data;
                    })()
                }
            ]
        });
    });
})();
