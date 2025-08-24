/*
Path: src/adapters/app.js
*/

import UiService from '../interface_adapters/presenters/ui_presenter.js';
import ErrorPresenter from '../interface_adapters/presenters/error_presenter.js';
import DashboardPresenter from '../interface_adapters/presenters/dashboard_presenter.js';
import HeaderPresenter from '../interface_adapters/presenters/header_presenter.js';
import LoadingPresenter from '../interface_adapters/presenters/loading_presenter.js';
import appState from '../application/app_state.js';
import ApiService from '../interface_adapters/gateways/api_service.js';
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

            // Normalizar el valor de conta: eliminar puntos de miles y reemplazar coma por punto decimal
            if (typeof conta === 'string') {
                // Elimina puntos (miles) y reemplaza la coma decimal por punto
                conta = conta.replace(/\./g, '').replace(',', '.');
                console.log("app.js - Valor normalizado de conta:", conta);
            }

    // Cargar dinámicamente el header usando HeaderPresenter
    await HeaderPresenter.renderHeader();

    LoadingPresenter.showLoading();

        // Verifica errores después de cargar la configuración
        const errors = appState.getErrors && appState.getErrors('apiService');
        if (errors && errors.length > 0) {
            console.error("app.js - Errores detectados en apiService:", errors);
            ErrorPresenter.showError(errors[errors.length - 1].message || 'Error desconocido');
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
            LoadingPresenter.hideLoading();
            if (result.status === 'success') {
                console.log("app.js - Datos recibidos correctamente:", result.data);
                appState.setInitialData(result.data);
                    try {
                        await this._renderDashboard(result.data);
                    } catch (err) {
                        console.error("app.js - Error al renderizar el dashboard:", err);
                        ErrorPresenter.showError('Error al renderizar el dashboard.');
                    }
                    // Suscribirse a cambios en chartData para actualizar la UI automáticamente
                    appState.subscribe('chart', async (newChartData) => {
                        try {
                            console.log("app.js - chartData actualizado:", newChartData);
                            // Combinar initialData y chartData para renderizar
                            const initialData = appState.getInitialData();
                            await this._renderDashboard({ ...initialData, ...newChartData });
                        } catch (err) {
                            console.error("app.js - Error al actualizar chartData:", err);
                            ErrorPresenter.showError('Error al actualizar el gráfico.');
                        }
                    });
                    // Cargar scripts solo una vez
                    if (!window._scriptsLoaded) {
                        try {
                            console.log("app.js - Cargando scripts dinámicamente");
                            const mainScript = document.createElement('script');
                            mainScript.type = 'module';
                            mainScript.src = 'src/adapters/main.js';
                            document.body.appendChild(mainScript);

                            // Corrige la ruta del ChartController
                            const chartScript = document.createElement('script');
                            chartScript.type = 'module';
                            chartScript.src = 'src/adapters/controllers/chart_controller.js';
                            document.body.appendChild(chartScript);
                            window._scriptsLoaded = true;
                        } catch (err) {
                            console.error("app.js - Error al cargar scripts dinámicos:", err);
                            ErrorPresenter.showError('Error al cargar scripts dinámicos.');
                        }
                    }
            } else {
                console.error("app.js - Error en la respuesta de la API:", result);
                ErrorPresenter.showError('Error al cargar datos.');
            }
        } catch (e) {
            LoadingPresenter.hideLoading();
            console.error("app.js - Error de conexión con la API:", e);
            ErrorPresenter.showError('Error de conexión con la API.');
        }
    }

    async _renderDashboard(data) {
        try {
            if (!data) {
                console.warn("app.js - No hay datos para renderizar el dashboard");
                return;
            }
            appState.periodo = data.periodo;
            appState.data = data;
            // Obtener la estructura de datos para el info-display
            const infoDisplayStructure = UiService.getDashboardDataForRender(data);
            // Usar el presenter para renderizar y actualizar el DOM
            const infoDisplayHtml = await DashboardPresenter.renderInfoDisplay(infoDisplayStructure);
            DashboardPresenter.updateInfoDisplayContainer(infoDisplayHtml);
            // Instanciar o actualizar ChartController con el gateway y presenter inyectados
            if (!this.chartController) {
                // Importar dependencias
                const HighchartsGateway = (await import('../interface_adapters/gateways/highcharts_gateway.js')).default;
                this.chartController = new ChartController(new HighchartsGateway(), DashboardPresenter);
                console.log("app.js - ChartController instanciado con dependencias");
            }
            this.chartController.init(appState.getInitialData(), appState.getChartData());
            console.log("app.js - ChartController inicializado");
        } catch (err) {
            console.error("app.js - Error en _renderDashboard:", err);
            ErrorPresenter.showError('Error al renderizar el dashboard.');
        }
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
                ErrorPresenter.showError('Error al cargar datos.');
            }
        } catch (error) {
            appState.setLoading('dashboard', false);
            appState.addError('dashboard', error);
            console.error("app.js - Error de conexión con la API al cambiar periodo:", error);
            ErrorPresenter.showError('Error de conexión con la API.');
        }
    }
}

const dashboardApp = new DashboardApp();
document.addEventListener('DOMContentLoaded', () => dashboardApp.init());

