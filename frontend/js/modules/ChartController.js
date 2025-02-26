/*
Path: frontend/js/modules/ChartController.js
Este script se encarga de generar el gráfico de Highcharts y de manejar el evento de doble click sobre el gráfico.
El gráfico se genera con los datos inyectados desde index.php, y el evento de doble click se encarga de hacer zoom en el gráfico.
*/

import { onDbClick } from './DoubleClickHandler.js';

(function() {
    // Function to initialize Highcharts with available data.
    function initChart() {
        try {
            console.log("Initializing chart_viewer...");
            var container = document.getElementById('container');
            if (!container) {
                console.error("Error: The container element with id 'container' was not found.");
                return;
            }
            console.log("Container validated. Proceeding with Highcharts initialization.");
            
            Highcharts.setOptions({
                global: { useUTC: false },
                lang: {
                    thousandsSep: "",
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                }
            });

            // Use the global window.chartData without fallback.
            var chartData = window.chartData;
            console.log("Chart data received:", chartData);

            Highcharts.chart('container', {
                chart: {
                    type: 'spline',
                    animation: false,
                    marginRight: 10,
                    events: {
                        load: function () { 
                            console.log("Chart loaded successfully");
                            // ...existing code...
                        },
                        click: function (event) { 
                            try {
                                console.log("Chart click event triggered");
                                onDbClick(event);
                            } catch (err) {
                                console.error("Error handling chart click:", err);
                            }
                        }
                    }
                },
                title: {
                    text: Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", chartData.conta),
                    events: {
                        click: function (event) { 
                            try {
                                console.log("Title click event triggered");
                                onDbClick(event);
                            } catch (err) {
                                console.error("Error handling title click:", err);
                            }
                        }
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
        } catch (e) {
            console.error("Error during chart initialization:", e);
        }
    }

    document.addEventListener('DOMContentLoaded', function() {
        if (window.chartData) {
            initChart();
        } else {
            console.warn("window.chartData not found. Waiting for chartDataReady event.");
            document.addEventListener('chartDataReady', initChart);
        }
    });

    // Comentar o eliminar la siguiente sección si no deseas el gráfico de Chart.js
    /*
    document.addEventListener('DOMContentLoaded', async () => {
        try {
            console.log("Fetching chart data from dashboard_test API...");
            const response = await fetch('/DataMaq/backend/api/dashboard_test.php?periodo=semana');
            if (!response.ok) {
                throw new Error('Error en la respuesta de la API');
            }
            const json = await response.json();
            if (json.status !== 'success') {
                throw new Error('Error en los datos de la API');
            }
            console.log("Chart data fetched successfully from API.");
            const chartData = json.data.chartData;
        
            console.log("Initializing Chart.js chart...");
            const myChartElement = document.getElementById('myChart');
            if (!myChartElement) {
                throw new Error("Element with id 'myChart' not found");
            }
            console.log("Found 'myChart' element:", myChartElement);
            const ctx = myChartElement.getContext('2d');
            console.log("Successfully obtained context from 'myChart' element.");
            
            new Chart(ctx, {
                type: 'line',
                data: {
                    labels: chartData.map(item => new Date(item.unixtime * 1000).toLocaleTimeString()),
                    datasets: [{
                        label: 'Valor',
                        data: chartData.map(item => item.HR_COUNTER1),
                        borderColor: 'rgba(75,192,192,1)',
                        fill: false,
                    }]
                },
                options: {
                    responsive: true,
                    // ...existing options...
                }
            });
        } catch (error) {
            console.error('Error fetching or initializing Chart.js chart:', error);
        }
    });
    */
})();
