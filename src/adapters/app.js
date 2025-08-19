/*
Path: js/app.js
*/

import UiService from './services/ui_service.js';
import appState from '../application/app_state.js';
import ApiService from './services/api_service.js';
import ChartController from './controllers/chart_controller.js';

class DashboardApp {
    constructor() {
        this.chartController = null;
    }

    async init() {
        const params = new URLSearchParams(window.location.search);
        const periodo = params.get('periodo');
        let conta = params.get('conta');
        console.log("app.js - Parámetros de la URL:", { periodo, conta });

        // Normalizar el valor de conta: reemplazar coma por punto
        if (typeof conta === 'string') {
            conta = conta.replace(',', '.');
            console.log("app.js - Valor normalizado de conta:", conta);
        }

        // Cargar dinámicamente el header
        fetch('public/templates/header.html')
            .then(response => {
                if (!response.ok) {
                    console.error("app.js - Error al cargar el header:", response.status);
                    throw new Error("No se pudo cargar el header");
                }
                return response.text();
            })
            .then(html => {
                document.getElementById('header-container').innerHTML = html;
                console.log("app.js - Header cargado correctamente");
            })
            .catch(err => {
                console.error("app.js - Error en la carga dinámica del header:", err);
            });

        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.style.display = '';
            console.log("app.js - Indicador de carga mostrado");
        } else {
            console.warn("app.js - No se encontró el indicador de carga");
        }

        // Verifica errores después de cargar la configuración
        const errors = appState.getErrors && appState.getErrors('apiService');
        if (errors && errors.length > 0) {
            console.error("app.js - Errores detectados en apiService:", errors);
            UiService.showError(errors[errors.length - 1].message || 'Error desconocido');
            return; // Detiene la inicialización si hay error crítico
        }

        try {
            let result;
            // Solo pasa los parámetros si existen
            if (periodo || conta) {
                console.log("app.js - Solicitando datos con parámetros:", { periodo, conta });
                result = await ApiService.getDashboardData(
                    periodo ? periodo : undefined,
                    conta ? conta : undefined
                );
            } else {
                console.log("app.js - Solicitando datos sin parámetros");
                result = await ApiService.getDashboardData();
            }
            if (loading) {
                loading.style.display = 'none';
                console.log("app.js - Indicador de carga ocultado");
            }
            if (result.status === 'success') {
                console.log("app.js - Datos recibidos correctamente:", result.data);
                appState.setInitialData(result.data);
                this._renderDashboard(result.data);
                // Suscribirse a cambios en chartData para actualizar la UI automáticamente
                appState.subscribe('chart', (newChartData) => {
                    console.log("app.js - chartData actualizado:", newChartData);
                    // Combinar initialData y chartData para renderizar
                    const initialData = appState.getInitialData();
                    this._renderDashboard({ ...initialData, ...newChartData });
                });
                // Cargar scripts solo una vez
                if (!window._scriptsLoaded) {
                    console.log("app.js - Cargando scripts dinámicamente");
                    const mainScript = document.createElement('script');
                    mainScript.type = 'module';
                    mainScript.src = 'src/adapters/main.js';
                    document.body.appendChild(mainScript);

                    // Corrige la ruta del ChartController
                    const chartScript = document.createElement('script');
                    chartScript.type = 'module';
                    chartScript.src = 'src/adapters/controllers/chart_controller.js'; // <-- Nueva ruta
                    document.body.appendChild(chartScript);
                    window._scriptsLoaded = true;
                }
            } else {
                console.error("app.js - Error en la respuesta de la API:", result);
                UiService.showError('Error al cargar datos.');
            }
        } catch (e) {
            if (loading) {
                loading.style.display = 'none';
                console.log("app.js - Indicador de carga ocultado por error");
            }
            console.error("app.js - Error de conexión con la API:", e);
            UiService.showError('Error de conexión con la API.');
        }
    }

    async _renderDashboard(data) {
        if (!data) {
            console.warn("app.js - No hay datos para renderizar el dashboard");
            return;
        }
        appState.periodo = data.periodo;
        appState.data = data;
        // Obtener la estructura de datos para el info-display
        const infoDisplayStructure = UiService.getDashboardDataForRender(data);
        // Renderizar el HTML usando el componente funcional
        const { renderInfoDisplay } = await import('./controllers/info_display.js');
        const infoDisplayHtml = renderInfoDisplay(infoDisplayStructure);
        // Actualizar el DOM
        const container = document.getElementById('info-display-container');
        if (container) {
            container.innerHTML = infoDisplayHtml;
            console.log("app.js - info-display-container actualizado");
        } else {
            console.error('DashboardApp - No se encontró el contenedor info-display-container');
        }
        // Instanciar o actualizar ChartController con el estado
        if (!this.chartController) {
            this.chartController = new ChartController();
            console.log("app.js - ChartController instanciado");
        }
        this.chartController.init(appState.getInitialData(), appState.getChartData());
        console.log("app.js - ChartController inicializado");
    }

    async changePeriodo(periodo) {
        // Evitar recarga si el periodo no cambia
        if (periodo === appState.getChartData()?.periodo) {
            console.warn("app.js - El periodo no ha cambiado, no se recarga");
            return;
        }

        // Centralizar el estado de carga usando AppState
        appState.setLoading('dashboard', true);
        console.log("app.js - Estado de carga activado para dashboard");

        try {
            // Usar ApiService para obtener los datos del nuevo periodo
            const result = await ApiService.getDashboardData(periodo);

            // Finalizar estado de carga
            appState.setLoading('dashboard', false);
            console.log("app.js - Estado de carga desactivado para dashboard");

            if (result.status === 'success') {
                console.log("app.js - Datos del nuevo periodo recibidos:", result.data);
                // Actualizar el estado centralizado con los nuevos datos
                appState.setInitialData(result.data);
                // Actualizar la UI en base al estado
                await this._renderDashboard(result.data);
            } else {
                // Registrar error en el estado centralizado
                appState.addError('dashboard', 'Error al cargar datos.');
                console.error("app.js - Error al cargar datos del nuevo periodo:", result);
                UiService.showError('Error al cargar datos.');
            }
        } catch (error) {
            appState.setLoading('dashboard', false);
            appState.addError('dashboard', error);
            console.error("app.js - Error de conexión con la API al cambiar periodo:", error);
            UiService.showError('Error de conexión con la API.');
        }
    }
}

const dashboardApp = new DashboardApp();
document.addEventListener('DOMContentLoaded', () => dashboardApp.init());

