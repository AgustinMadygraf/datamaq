/*
Path: src/interface_adapters/controllers/chart_controller.js
*/

import ValidateChartDataUseCase from '../../use_cases/validate_chart_data.js';
import BuildChartSeriesUseCase  from '../../use_cases/build_chart_series.js';

import { onDbClick }            from './double_click_handler.js';
import ChartDomManager          from './chart_dom_manager.js';
import ChartEventManager        from './chart_event_manager.js';
import ChartRenderer            from '../../infrastructure/ui/chart_renderer.js';
import ChartDataLoader          from '../gateways/chart_data_gateway.js';
import eventBus                 from '../../infrastructure/event_bus.js';
import { EVENT_CONTRACT }       from '../../infrastructure/event_bus_contract.js';

import { GatewayContract } from '../gateways/gateway_contract.js';
import { PresenterContract } from '../presenters/presenter_contract.js';

class ChartController {
    /**
     * @param {GatewayContract} chartGateway
     * @param {PresenterContract} presenter
     */
    constructor(chartGateway, presenter) {
        this.chartInitialized = false;
        this.chartDataReceived = false;
        this.failedAttempts = 0;
        this.maxFailedAttempts = 5;
        this.chartData = null;
        this.initialData = null;
        this.chartGateway = chartGateway;
        this.presenter = presenter;
        this.validateChartDataUseCase = new ValidateChartDataUseCase();
        this.buildChartSeriesUseCase = new BuildChartSeriesUseCase();
        this.eventManager = new ChartEventManager(this);
        this.dataLoader = new ChartDataLoader(this);
        this.chartRenderer = new ChartRenderer(this);
        this.domManager = new ChartDomManager();
        this.initChart = this.initChart.bind(this);
    }
    // Métodos requeridos por ChartEventManager
    getChartData() {
        return this.chartData;
    }

    updateChartSelection(selection) {
        // Puedes guardar la selección en el estado o emitir un evento
        this.chartSelection = selection;
        // Opcional: emitir evento o log
    }

    updateChartStatus(status) {
        this.chartStatus = status;
        this.chartInitialized = !!status.loaded;
    }

    addError(context, error) {
        // Puedes guardar los errores en un array o simplemente loguear
        if (!this.errors) this.errors = [];
        this.errors.push({ context, error });
        console.error(`ChartController - Error registrado en contexto '${context}':`, error);
    }

    setChartData(chartData) {
        this.chartData = chartData;
    }

    setInitialData(initialData) {
        this.initialData = initialData;
    }
    
    async forceChartDataLoad() {
        try {
            const initialData = this.initialData;
            if (!initialData) {
                console.warn("ChartController - initialData no encontrado");
                this.failedAttempts++;
                return;
            }
            const chartData = await this.dataLoader.loadChartData(initialData);
            if (chartData) {
                this.setChartData(chartData);
                this.initChart();
            } else {
                throw new Error("Error al cargar datos del gráfico");
            }
        } catch (e) {
            console.error("ChartController - Error en forceChartDataLoad:", e);
            this.failedAttempts++;
        }
    }

    // Registra el estado actual de chartData con detalles adicionales
    logChartDataStatus() {
        try {
            const chartData = this.chartData;
            const chartDataExists = chartData !== undefined && chartData !== null;
            return chartDataExists;
        } catch (e) {
            console.error("ChartController - Error al registrar estado de chartData:", e);
            return false;
        }
    }

    // Método para esperar a que el contenedor esté disponible
    waitForContainer(maxWaitTime = 5000, interval = 200) {
        return this.domManager.waitForContainer('container', maxWaitTime, interval);
    }

    // Inicializa el gráfico Highcharts con manejo mejorado de errores
    async initChart() {
        try {
            const chartData = this.chartData;
            if (!chartData) {
                console.error("ChartController - chartData no existe, no se puede inicializar el gráfico");
                this.failedAttempts++;
                
                if (this.failedAttempts >= this.maxFailedAttempts) {
                    console.error("ChartController - Máximo de intentos de inicialización alcanzado");
                } else {
                    this.loadChartData();
                }
                return;
            }

            // Verificar existencia de Highcharts
            if (typeof window.Highcharts === 'undefined') {
                console.error("ChartController - Error: Highcharts no está definido.");
                return;
            }

            // Esperar a que el contenedor esté disponible usando la utilidad
            let container;
            try {
                container = await this.domManager.waitForContainer('container');
            } catch (containerError) {
                console.error("ChartController - Error esperando al contenedor:", containerError);
                // Verificar si el contenedor hay que crearlo
                container = this.domManager.createContainer('info-display-container', 'container', 'graf');
                if (container) {
                } else {
                    console.error("ChartController - No se puede crear el contenedor, no se encontró el contenedor padre");
                    // Imprimir todos los elementos con clase 'graf' para depuración
                    return;
                }
            }
            
                // Validar los datos usando el caso de uso
                if (!this.validateChartDataUseCase.execute(this.chartData)) {
                    console.error("ChartController - Validación de chartData falló");
                    return;
                }

            this.chartDataReceived = true;


            // Crear el gráfico
            this.createChart(container);

        } catch (e) {
            console.error("ChartController - Error crítico durante la inicialización del gráfico:", e);
            
            // Intentar recuperación
            this.failedAttempts++;
            if (this.failedAttempts < this.maxFailedAttempts) {
                
                // Dar tiempo al DOM para actualizarse
                setTimeout(() => {
                    this.forceChartDataLoad();
                }, 1000);
            }
        }
    }

    // Resto de métodos con try-catch mejorado
    handleChartClick(event) {
        try {
            onDbClick(event);
        } catch (err) {
            console.error("ChartController - Error al manejar clic en gráfico:", err);
        }
    }

    handleChartLoad() {
        try {
            this.chartInitialized = true;
            this.failedAttempts = 0; // Resetear contador de fallos
        } catch (err) {
            console.error("ChartController - Error en handleChartLoad:", err);
        }
    }

    createChart(container) {
        // Delegar la creación del gráfico al gateway inyectado
        const series = this.buildChartSeriesUseCase.execute(this.chartData);
        const config = this.chartRenderer.chartConfigService.getChartConfig({
            chartData: this.chartData,
            series,
            title: this.chartData?.conta ? window.Highcharts.dateFormat("%A, %d %B %Y - %H:%M:%S", this.chartData.conta) : '',
            onClickHandler: this.eventManager.handleChartClick,
            onLoadHandler: this.eventManager.handleChartLoad
        });
        this.chartGateway.createChart(container, config);
    }

    setupEventListeners() {
        try {
            // Escuchar cuando el DOM esté listo
            eventBus.subscribe('appDomReady', () => {
                try {
                    const chartDataExists = this.logChartDataStatus();
                    if (chartDataExists) {
                        this.initChart();
                    } else {
                        console.warn("ChartController - chartData no encontrado. Esperando evento CHART_DATA_UPDATED");
                        const initialData = appState.getInitialData();
                    }
                } catch (err) {
                    console.error("ChartController - Error en el manejador de appDomReady:", err);
                }
            });

            // Escuchar el evento chartDataReady usando event bus local
            eventBus.subscribe(EVENT_CONTRACT.CHART_DATA_UPDATED, (payload) => {
                try {
                    if (payload && payload.chartData) {
                        this.setChartData(payload.chartData);
                    }
                    const chartDataExists = this.logChartDataStatus();
                    if (!chartDataExists) {
                        console.error("ChartController - chartData sigue indefinido después del evento CHART_DATA_UPDATED");
                        this.forceChartDataLoad();
                        return;
                    }
                    setTimeout(this.initChart, 100);
                } catch (err) {
                    console.error("ChartController - Error en el manejador de chartDataReady:", err);
                }
            });

            // Nueva verificación: Custom event para cuando el container se haga visible
            eventBus.subscribe('containerReady', (payload) => {
                if (this.chartData && !this.chartInitialized) {
                    setTimeout(this.initChart, 100);
                }
            });

            // Escuchar actualizaciones automáticas
            eventBus.subscribe('AUTO_DATA_UPDATED', (payload) => {
                try {
                    if (payload && payload.chartData) {
                        this.setChartData(payload.chartData);
                        // Actualizar el gráfico con los nuevos datos
                        this.updateChart();
                    }
                } catch (err) {
                    console.error("ChartController - Error en el manejador de AUTO_DATA_UPDATED:", err);
                }
            });
        } catch (e) {
            console.error("ChartController - Error al configurar event listeners:", e);
        }
    }

    // Método para actualizar el gráfico con los nuevos datos
    updateChart() {
        if (!this.chartData || !this.chartInitialized) return;
        
        try {
            const container = document.getElementById('container');
            if (!container) return;
            
            // Actualizar el gráfico sin recrearlo completamente
            const series = this.buildChartSeriesUseCase.execute(this.chartData);
            // Aquí accederías al objeto chart ya creado y actualizarías sus series
            // Esto depende de cómo esté implementado el gateway de Highcharts
        } catch (error) {
            console.error("ChartController - Error al actualizar el gráfico:", error);
        }
    }

    startPeriodicCheck() {
        try {
            let checkAttempts = 0;
            const maxAttempts = 15; // Aumentado para dar más tiempo
            
            const checkInterval = setInterval(() => {
                checkAttempts++;
                try {
                    // Verificar si chartData existe usando el estado centralizado
                    const chartData = this.chartData;
                    const chartDataExists = chartData !== undefined && chartData !== null;
                    
                    // Verificar si el contenedor existe
                    const containerExists = document.getElementById('container') !== null;
                    if (chartDataExists && containerExists && !this.chartInitialized) {
                        clearInterval(checkInterval);
                        this.initChart();
                    } else if (checkAttempts >= maxAttempts) {
                        console.warn("ChartController - Máximo de intentos de verificación alcanzado, cancelando verificación periódica");
                        clearInterval(checkInterval);
                        
                        // Último intento de recuperación
                        if (!this.chartInitialized) {
                            this.forceChartDataLoad();
                        }
                    } else if (checkAttempts % 3 === 0) {
                        // Cada 3 intentos, intentar forzar la carga si no hay datos
                        if (!chartDataExists && this.failedAttempts < this.maxFailedAttempts) {
                            this.forceChartDataLoad();
                        }
                        
                        // Verificar el DOM
                        if (!containerExists) {
                            // Buscar elementos que podrían contener el gráfico
                            const infoDisplay = document.getElementById('info-display-container');
                            if (infoDisplay) {

                                // Verificar si hay elementos con clase 'graf'
                                const grafElements = infoDisplay.querySelectorAll('.graf');
                                if (grafElements.length > 0) {
                                }
                            }
                        }
                    }
                } catch (err) {
                    console.error("ChartController - Error en verificación periódica:", err);
                }
            }, 1000);
        } catch (e) {
            console.error("ChartController - Error al iniciar verificación periódica:", e);
        }
    }

    // Método de inicialización mejorado
    init(initialData, chartData) {
        try {
            this.setInitialData(initialData);
            this.setChartData(chartData);
            this.logChartDataStatus();
            this.setupEventListeners();
            this.startPeriodicCheck();
        } catch (e) {
            console.error("ChartController - Error durante la inicialización:", e);
        }
    }
}

// Exportar la clase para que el controlador principal la instancie y pase el estado
export default ChartController;
