/*
Path: frontend/js/modules/ChartController.js
Este script se encarga de generar el gráfico de Highcharts y de manejar el evento de doble click sobre el gráfico.
*/

import { onDbClick } from './DoubleClickHandler.js';

(function() {
    console.log("ChartController.js - Módulo cargado");
    
    // Estado global para seguimiento de depuración
    let chartInitialized = false;
    let chartDataReceived = false;
    
    // Función para registrar el estado actual de chartData
    function logChartDataStatus() {
        console.log("ChartController - Estado de chartData:", {
            exists: window.chartData !== undefined,
            value: window.chartData,
            initialized: chartInitialized,
            dataReceived: chartDataReceived
        });
    }
    
    // Function to initialize Highcharts with available data.
    function initChart() {
        try {
            console.log("ChartController - Iniciando initChart()...");
            logChartDataStatus();
            
            // Asegurarnos de que container existe
            var container = document.getElementById('container');
            if (!container) {
                console.error("ChartController - Error: The container element with id 'container' was not found.");
                return;
            }
            console.log("ChartController - Container encontrado:", container);
            
            // Verificar chartData explícitamente
            if (!window.chartData) {
                console.error("ChartController - Error crítico: window.chartData no está definido en initChart()");
                return;
            }
            
            // Verificar que chartData tiene las propiedades necesarias
            try {
                const requiredProps = ['conta', 'rawdata', 'ls_periodos', 'menos_periodo', 'periodo'];
                const missingProps = requiredProps.filter(prop => !window.chartData.hasOwnProperty(prop));
                
                if (missingProps.length > 0) {
                    console.error(`ChartController - Error: chartData no tiene las propiedades requeridas: ${missingProps.join(', ')}`);
                    return;
                }
                
                // Verificar datos específicos
                if (!Array.isArray(window.chartData.rawdata) || window.chartData.rawdata.length === 0) {
                    console.error("ChartController - Error: chartData.rawdata no es un array válido:", window.chartData.rawdata);
                    return;
                }
                
                console.log("ChartController - chartData validado correctamente:", {
                    conta: window.chartData.conta,
                    rawdataLength: window.chartData.rawdata.length,
                    periodo: window.chartData.periodo
                });
                
                chartDataReceived = true;
            } catch (validationError) {
                console.error("ChartController - Error validando chartData:", validationError);
                return;
            }
            
            console.log("ChartController - Configurando Highcharts...");
            Highcharts.setOptions({
                global: { useUTC: false },
                lang: {
                    thousandsSep: "",
                    months: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
                    weekdays: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado']
                }
            });

            console.log("ChartController - Creando gráfico...");
            Highcharts.chart('container', {
                chart: {
                    type: 'spline',
                    animation: false,
                    marginRight: 10,
                    events: {
                        load: function () { 
                            console.log("ChartController - Gráfico cargado exitosamente");
                            chartInitialized = true;
                        },
                        click: function (event) { 
                            try {
                                console.log("ChartController - Evento de clic en gráfico");
                                onDbClick(event);
                            } catch (err) {
                                console.error("ChartController - Error al manejar clic en gráfico:", err);
                            }
                        }
                    }
                },
                title: {
                    text: Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", window.chartData.conta),
                    events: {
                        click: function (event) { 
                            try {
                                onDbClick(event);
                            } catch (err) {
                                console.error("ChartController - Error al manejar clic en título:", err);
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
                            try {
                                var data = [];
                                window.chartData.rawdata.forEach(function(point, index) {
                                    if(index > 0 && point && point.unixtime && point.HR_COUNTER1 !== undefined) {
                                        data.push([1000 * point.unixtime, point.HR_COUNTER1 / 5]);
                                    }
                                });
                                console.log(`ChartController - Serie 'Sensor inductivo' generada: ${data.length} puntos`);
                                return data;
                            } catch (err) {
                                console.error("ChartController - Error generando serie 'Sensor inductivo':", err);
                                return [];
                            }
                        })()
                    },
                    {
                        name: 'Sensor optico',
                        animation: false,
                        data: (function () {
                            try {
                                var data = [];
                                window.chartData.rawdata.forEach(function(point, index) {
                                    if(index > 0 && point && point.unixtime && point.HR_COUNTER2 !== undefined) {
                                        data.push([1000 * point.unixtime, point.HR_COUNTER2 / 5]);
                                    }
                                });
                                console.log(`ChartController - Serie 'Sensor optico' generada: ${data.length} puntos`);
                                return data;
                            } catch (err) {
                                console.error("ChartController - Error generando serie 'Sensor optico':", err);
                                return [];
                            }
                        })()
                    },
                    {
                        name: 'marcha',
                        animation: false,
                        data: (function () {
                            try {
                                var data = [];
                                window.chartData.rawdata.forEach(function(point, index) {
                                    if(index > 0 && point && point.unixtime) {
                                        data.push([1000 * point.unixtime, 20]);
                                    }
                                });
                                console.log(`ChartController - Serie 'marcha' generada: ${data.length} puntos`);
                                return data;
                            } catch (err) {
                                console.error("ChartController - Error generando serie 'marcha':", err);
                                return [];
                            }
                        })()
                    }
                ]
            });
            
            console.log("ChartController - Inicialización del gráfico completada");
        } catch (e) {
            console.error("ChartController - Error crítico durante la inicialización del gráfico:", e);
            console.log("ChartController - Stack trace:", e.stack);
        }
    }

    // Comprobar chartData al cargar la página
    document.addEventListener('DOMContentLoaded', function() {
        console.log("ChartController - DOMContentLoaded disparado");
        
        try {
            logChartDataStatus();
            
            if (window.chartData) {
                console.log("ChartController - window.chartData encontrado en DOMContentLoaded, iniciando gráfico");
                initChart();
            } else {
                console.warn("ChartController - window.chartData no encontrado. Esperando evento chartDataReady");
                
                // Verificar si main.js está cargado
                console.log("ChartController - Estado de módulos:", {
                    "window.initialData": window.initialData !== undefined ? "disponible" : "no disponible",
                    "ApiService cargado": typeof ApiService !== 'undefined' ? "sí" : "no"
                });
            }
        } catch (err) {
            console.error("ChartController - Error en el manejador de DOMContentLoaded:", err);
        }
    });

    // Escuchar evento chartDataReady de manera más robusta
    document.addEventListener('chartDataReady', function(event) {
        console.log("ChartController - Evento chartDataReady recibido");
        
        try {
            // Re-verificar chartData después de recibir el evento
            logChartDataStatus();
            
            if (!window.chartData) {
                console.error("ChartController - window.chartData sigue indefinido después del evento chartDataReady");
                return;
            }
            
            console.log("ChartController - Iniciando gráfico desde evento chartDataReady");
            setTimeout(initChart, 100); // Pequeño retraso para asegurar que el DOM está listo
        } catch (err) {
            console.error("ChartController - Error en el manejador de chartDataReady:", err);
        }
    });
    
    // Verificación periódica por si acaso (como medida de respaldo)
    let checkAttempts = 0;
    const maxAttempts = 10;
    
    const checkInterval = setInterval(function() {
        checkAttempts++;
        console.log(`ChartController - Verificación periódica #${checkAttempts}`);
        
        try {
            if (window.chartData && !chartInitialized) {
                console.log("ChartController - chartData encontrado en verificación periódica");
                clearInterval(checkInterval);
                initChart();
            } else if (checkAttempts >= maxAttempts) {
                console.warn("ChartController - Máximo de intentos de verificación alcanzado, cancelando verificación periódica");
                clearInterval(checkInterval);
            }
        } catch (err) {
            console.error("ChartController - Error en verificación periódica:", err);
        }
    }, 1000);
})();
