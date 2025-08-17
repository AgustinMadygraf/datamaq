/*
Path: src/adapters/controllers/ChartController.js
*/

import { onDbClick } from '../../../js/modules/DoubleClickHandler.js';
import HighchartsConfig from '../../../js/modules/chart/HighchartsConfig.js';
import ChartRenderer from '../views/ChartRenderer.js';
import ChartDataValidator from '../../domain/services/ChartDataValidator.js';
import BuildChartSeriesUseCase from '../../domain/usecases/BuildChartSeriesUseCase.js';
// El estado se recibirá por argumentos/setters

// Módulos nuevos a crear
import ChartDomManager from '../../../js/modules/chart/ChartDomManager.js';
import ChartEventManager from '../../../src/adapters/controllers/ChartEventManager.js';
import ChartDataLoader from '../../../js/modules/chart/ChartDataLoader.js';

import eventBus from '../../../js/utils/EventBus.js';
import { EVENT_CONTRACT } from '../../../js/utils/eventBus.contract.js';
// Clase principal para manejar el gráfico
class ChartController {
    constructor() {
        this.chartInitialized = false;
        this.chartDataReceived = false;
        this.failedAttempts = 0;
        this.maxFailedAttempts = 5;
        this.chartData = null;
        this.initialData = null;
    this.validator = new ChartDataValidator();
    this.buildChartSeriesUseCase = new BuildChartSeriesUseCase();
    this.eventManager = new ChartEventManager(this);
    this.dataLoader = new ChartDataLoader(this);
    this.chartRenderer = new ChartRenderer(this);
    this.domManager = new ChartDomManager();
    this.initChart = this.initChart.bind(this);
        // Elimina los binds de los métodos que ahora delegan en eventManager
    }
    // Métodos requeridos por ChartEventManager
    getChartData() {
        return this.chartData;
    }

    updateChartSelection(selection) {
        // Puedes guardar la selección en el estado o emitir un evento
        this.chartSelection = selection;
        // Opcional: emitir evento o log
        console.log('ChartController - chartSelection actualizada:', selection);
    }

    updateChartStatus(status) {
        this.chartStatus = status;
        this.chartInitialized = !!status.loaded;
        console.log('ChartController - chartStatus actualizado:', status);
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
    
    // Método para forzar la carga de datos del gráfico desde main.js
    async forceChartDataLoad() {
        try {
            console.log("ChartController - Intentando forzar carga de datos desde ChartDataLoader");
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
            const chartDataType = chartDataExists ? typeof chartData : 'undefined';
            const chartDataIsObject = chartDataExists && typeof chartData === 'object';
            const chartDataIsNull = chartDataExists && chartData === null;

            console.log("ChartController - Estado detallado de chartData:", {
                exists: chartDataExists,
                type: chartDataType,
                isObject: chartDataIsObject,
                isNull: chartDataIsNull,
                value: chartDataExists ? chartData : undefined,
                chartInitialized: this.chartInitialized,
                dataReceived: this.chartDataReceived,
                failedAttempts: this.failedAttempts
            });

            // Inspeccionar contexto global y estado centralizado
            const initialData = this.initialData;
            console.log("ChartController - Objetos relevantes presentes:", {
                initialData: initialData !== undefined && initialData !== null,
                Highcharts: typeof window.Highcharts !== 'undefined',
                Chart: typeof window.Chart !== 'undefined',
                jQuery: typeof window.jQuery !== 'undefined',
                $: typeof window.$ !== 'undefined',
            });

            return chartDataExists;
        } catch (e) {
            console.error("ChartController - Error al registrar estado de chartData:", e);
            return false;
        }
    }

    // Método para esperar a que el contenedor esté disponible
    waitForContainer(maxWaitTime = 5000, interval = 200) {
        console.log("ChartController - Esperando a que el contenedor esté disponible");
        return this.domManager.waitForContainer('container', maxWaitTime, interval);
    }

    // Inicializa el gráfico Highcharts con manejo mejorado de errores
    async initChart() {
        try {
            console.log("ChartController - Iniciando initChart()...");
            const chartData = this.chartData;
            if (!chartData) {
                console.error("ChartController - chartData no existe, no se puede inicializar el gráfico");
                this.failedAttempts++;
                
                if (this.failedAttempts >= this.maxFailedAttempts) {
                    console.error("ChartController - Máximo de intentos de inicialización alcanzado");
                } else {
                    console.log("ChartController - Intentando cargar datos...");
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
                console.log("ChartController - Container obtenido correctamente");
            } catch (containerError) {
                console.error("ChartController - Error esperando al contenedor:", containerError);
                // Verificar si el contenedor hay que crearlo
                container = this.domManager.createContainer('info-display-container', 'container', 'graf');
                if (container) {
                    console.log("ChartController - Contenedor creado manualmente:", container);
                } else {
                    console.error("ChartController - No se puede crear el contenedor, no se encontró el contenedor padre");
                    // Imprimir todos los elementos con clase 'graf' para depuración
                    const grafElements = document.querySelectorAll('.graf');
                    console.log(`ChartController - Encontrados ${grafElements.length} elementos con clase 'graf':`, Array.from(grafElements));
                    // Verificar la estructura DOM
                    console.log("ChartController - Estructura del DOM:", {
                        body: document.body.innerHTML.substring(0, 500) + '...'
                    });
                    return;
                }
            }
            
            console.log("ChartController - Container encontrado:", {
                id: container.id,
                className: container.className,
                parentNode: container.parentNode?.tagName,
                isVisible: this.domManager.isContainerVisible(container),
                dimensions: this.domManager.getContainerDimensions(container)
            });

                // Validar los datos usando el estado centralizado
                if (!this.validator.validateChartData(this.chartData)) {
                    console.error("ChartController - Validación de chartData falló");
                    return;
                }

            this.chartDataReceived = true;

            // Configuración global de Highcharts
            try {
                HighchartsConfig.applyGlobalConfig();
            } catch (configError) {
                console.error("ChartController - Error al aplicar configuración global:", configError);
                // Configuración fallback
                Highcharts.setOptions({
                    global: { useUTC: false }
                });
            }

            // Crear el gráfico
            this.createChart(container);

            console.log("ChartController - Inicialización del gráfico completada");
        } catch (e) {
            console.error("ChartController - Error crítico durante la inicialización del gráfico:", e);
            console.log("ChartController - Stack trace:", e.stack);
            
            // Intentar recuperación
            this.failedAttempts++;
            if (this.failedAttempts < this.maxFailedAttempts) {
                console.log(`ChartController - Intentando recuperación (intento ${this.failedAttempts}/${this.maxFailedAttempts})...`);
                
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
            console.log("ChartController - Evento de clic en gráfico");
            onDbClick(event);
        } catch (err) {
            console.error("ChartController - Error al manejar clic en gráfico:", err);
        }
    }

    handleChartLoad() {
        try {
            console.log("ChartController - Gráfico cargado exitosamente");
            this.chartInitialized = true;
            this.failedAttempts = 0; // Resetear contador de fallos
        } catch (err) {
            console.error("ChartController - Error en handleChartLoad:", err);
        }
    }

    createChart(container) {
        // Delegar la creación del gráfico al ChartRenderer
        this.chartRenderer.createChart(container, this.chartData, this.buildChartSeriesUseCase);
    }

    setupEventListeners() {
        try {
            console.log("ChartController - Configurando event listeners");
            

            // Escuchar cuando el DOM esté listo
            eventBus.subscribe('appDomReady', () => {
                console.log("ChartController - Evento appDomReady recibido (event bus)");
                try {
                    const chartDataExists = this.logChartDataStatus();
                    if (chartDataExists) {
                        console.log("ChartController - chartData encontrado en appDomReady, iniciando gráfico");
                        this.initChart();
                    } else {
                        console.warn("ChartController - chartData no encontrado. Esperando evento CHART_DATA_UPDATED");
                        const initialData = appState.getInitialData();
                        console.log("ChartController - Estado de módulos:", {
                            initialData: initialData !== undefined && initialData !== null ? "disponible" : "no disponible"
                        });
                    }
                } catch (err) {
                    console.error("ChartController - Error en el manejador de appDomReady:", err);
                }
            });

            // Escuchar el evento chartDataReady usando event bus local
            eventBus.subscribe(EVENT_CONTRACT.CHART_DATA_UPDATED, (payload) => {
                console.log("ChartController - Evento CHART_DATA_UPDATED recibido", payload);
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
                    console.log("ChartController - Iniciando gráfico desde evento chartDataReady");
                    setTimeout(this.initChart, 100);
                } catch (err) {
                    console.error("ChartController - Error en el manejador de chartDataReady:", err);
                }
            });

            // Nueva verificación: Custom event para cuando el container se haga visible
            eventBus.subscribe('containerReady', (payload) => {
                console.log("ChartController - Evento containerReady recibido (event bus)", payload);
                if (this.chartData && !this.chartInitialized) {
                    setTimeout(this.initChart, 100);
                }
            });
            
            console.log("ChartController - Event listeners configurados correctamente");
        } catch (e) {
            console.error("ChartController - Error al configurar event listeners:", e);
        }
    }

    startPeriodicCheck() {
        try {
            console.log("ChartController - Iniciando verificación periódica");
            
            let checkAttempts = 0;
            const maxAttempts = 15; // Aumentado para dar más tiempo
            
            const checkInterval = setInterval(() => {
                checkAttempts++;
                console.log(`ChartController - Verificación periódica #${checkAttempts}`);
                
                try {
                    // Verificar si chartData existe usando el estado centralizado
                    const chartData = this.chartData;
                    const chartDataExists = chartData !== undefined && chartData !== null;
                    
                    // Verificar si el contenedor existe
                    const containerExists = document.getElementById('container') !== null;
                    
                    console.log(`ChartController - Verificación #${checkAttempts}: chartData=${chartDataExists}, container=${containerExists}, initialized=${this.chartInitialized}`);
                    
                    if (chartDataExists && containerExists && !this.chartInitialized) {
                        console.log("ChartController - Condiciones cumplidas en verificación periódica");
                        clearInterval(checkInterval);
                        this.initChart();
                    } else if (checkAttempts >= maxAttempts) {
                        console.warn("ChartController - Máximo de intentos de verificación alcanzado, cancelando verificación periódica");
                        clearInterval(checkInterval);
                        
                        // Último intento de recuperación
                        if (!this.chartInitialized) {
                            console.log("ChartController - Último intento de recuperación");
                            this.forceChartDataLoad();
                        }
                    } else if (checkAttempts % 3 === 0) {
                        // Cada 3 intentos, intentar forzar la carga si no hay datos
                        if (!chartDataExists && this.failedAttempts < this.maxFailedAttempts) {
                            console.log("ChartController - Intentando forzar carga de datos en verificación periódica");
                            this.forceChartDataLoad();
                        }
                        
                        // Verificar el DOM
                        if (!containerExists) {
                            console.log("ChartController - El contenedor 'container' no existe en verificación periódica");
                            // Buscar elementos que podrían contener el gráfico
                            const infoDisplay = document.getElementById('info-display-container');
                            if (infoDisplay) {
                                console.log("ChartController - info-display-container encontrado, verificando contenido");
                                
                                // Verificar si hay elementos con clase 'graf'
                                const grafElements = infoDisplay.querySelectorAll('.graf');
                                if (grafElements.length > 0) {
                                    console.log("ChartController - Elementos .graf encontrados:", grafElements);
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
            console.log("ChartController - Inicializando...");
            this.setInitialData(initialData);
            this.setChartData(chartData);
            this.logChartDataStatus();
            this.setupEventListeners();
            this.startPeriodicCheck();
            console.log("ChartController - Inicialización completada");
        } catch (e) {
            console.error("ChartController - Error durante la inicialización:", e);
        }
    }
}

// Exportar la clase para que el controlador principal la instancie y pase el estado
export default ChartController;
