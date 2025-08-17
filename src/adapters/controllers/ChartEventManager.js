/*
Path: src/adapters/controllers/ChartEventManager.js
Este módulo gestiona los eventos relacionados con el gráfico de Highcharts.
Desacopla la lógica de eventos del controlador principal para mejorar la mantenibilidad.
*/

import { onDbClick } from '../../../js/modules/DoubleClickHandler.js';
import eventBus from '../../../js/utils/EventBus.js';

export default class ChartEventManager {
    /**
     * Constructor del gestor de eventos
     * @param {Object} chartController - Referencia al controlador principal
     */
    constructor(chartController) {
        this.chartController = chartController;
        this.clickTimeout = null;
        this.clickDelay = 300; // ms para detectar doble click
        
        // Bindear métodos
        this.handleChartClick = this.handleChartClick.bind(this);
        this.handleChartLoad = this.handleChartLoad.bind(this);
        this.dispatchChartEvent = this.dispatchChartEvent.bind(this);
    }

    /**
     * Maneja el evento de clic en el gráfico
     * @param {Object} event - Evento de Highcharts
     */
    handleChartClick(event) {
        try {
            if (!event || !event.xAxis || !event.xAxis[0]) {
                console.warn("ChartEventManager - Evento de clic sin coordenadas X válidas");
                return;
            }

            // Detector de doble clic centralizado aquí
            if (this._lastClick && (event.xAxis[0].value === this._lastClick.xValue)) {
                const now = Date.now();
                if (now - this._lastClick.time < this.clickDelay) {
                    // Doble clic detectado
                    this._lastClick = null;
                    onDbClick(event);
                    return;
                }
            }
            // Registrar el clic actual
            this._lastClick = {
                xValue: event.xAxis[0].value,
                time: Date.now()
            };
            // Esperar por posible segundo clic
            setTimeout(() => {
                // Si no hubo doble clic, procesar como simple clic
                if (this._lastClick) {
                    this.processSingleClick(event);
                    this._lastClick = null;
                }
            }, this.clickDelay);
        } catch (error) {
            console.error("ChartEventManager - Error al manejar clic:", error);
            if (this.chartController && typeof this.chartController.addError === 'function') {
                this.chartController.addError('chartEvent', error);
            }
        }
    }

    /**
     * Procesa un clic simple en el gráfico
     * @param {Object} event - Evento de Highcharts
     */
    processSingleClick(event) {
        try {
            // Obtener chartData desde el controlador
            const chartData = this.chartController && typeof this.chartController.getChartData === 'function'
                ? this.chartController.getChartData()
                : this.chartController.chartData;
            if (!chartData) return;

            const xValue = event.xAxis[0].value;
            console.log("ChartEventManager - Clic en X:", xValue);

            // Actualizar estado con la posición seleccionada
            if (this.chartController && typeof this.chartController.updateChartSelection === 'function') {
                this.chartController.updateChartSelection({
                    x: xValue,
                    timestamp: new Date().getTime()
                });
            }

            // Disparar evento personalizado
            this.dispatchChartEvent('chartPointSelected', {
                x: xValue,
                rawX: event.xAxis[0].value
            });

        } catch (error) {
            console.error("ChartEventManager - Error en procesamiento de clic simple:", error);
            if (this.chartController && typeof this.chartController.addError === 'function') {
                this.chartController.addError('chartEvent', error);
            }
        }
    }

    /**
     * Maneja el evento de carga completa del gráfico
     * @param {Object} event - Evento de Highcharts
     */
    handleChartLoad(event) {
        try {
            console.log("ChartEventManager - Gráfico cargado completamente");

            // Actualizar estado en el controlador si existe método
            if (this.chartController && typeof this.chartController.updateChartStatus === 'function') {
                this.chartController.updateChartStatus({ loaded: true, timestamp: new Date().getTime() });
            }

            // Notificar que el gráfico está listo
            this.dispatchChartEvent('chartReady', {
                chart: event.target
            });

        } catch (error) {
            console.error("ChartEventManager - Error en evento de carga:", error);
            if (this.chartController && typeof this.chartController.addError === 'function') {
                this.chartController.addError('chartEvent', error);
            }
        }
    }

    /**
     * Despacha un evento personalizado para el gráfico
     * @param {string} eventName - Nombre del evento
     * @param {Object} detail - Datos adicionales del evento
     */
    dispatchChartEvent(eventName, detail = {}) {
        try {
            // Usar eventBus para emitir eventos
            eventBus.emit(eventName, detail);
        } catch (error) {
            console.error(`ChartEventManager - Error al despachar evento ${eventName}:`, error);
            if (this.chartController && typeof this.chartController.addError === 'function') {
                this.chartController.addError('chartEvent', error);
            }
        }
    }

    /**
     * Registra un listener para eventos del gráfico
     * @param {string} eventName - Nombre del evento
     * @param {Function} callback - Función a llamar
     */
    registerListener(eventName, callback) {
        // Usar eventBus para registrar listeners
        return eventBus.subscribe(eventName, callback);
    }

    /**
     * Elimina un listener de eventos del gráfico
     * @param {string} eventName - Nombre del evento
     * @param {Function} callback - Función a eliminar
     */
    removeListener(eventName, callback) {
        // Usar eventBus para eliminar listeners
        // El eventBus retorna una función de desuscripción en subscribe, guardar y llamar esa función aquí si se requiere
        // (Para compatibilidad, se puede mantener una referencia interna si es necesario)
        eventBus.unsubscribe(eventName, callback);
    }
}