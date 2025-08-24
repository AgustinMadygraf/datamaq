/*
Path: src/infrastructure/app.js
*/

import HeaderPresenter from '../interface_adapters/presenters/header_presenter.js';
import LoadingPresenter from '../interface_adapters/presenters/loading_presenter.js';
import ErrorPresenter from '../interface_adapters/presenters/error_presenter.js';
import DashboardPresenter from '../interface_adapters/presenters/dashboard_presenter.js';
import UiService from '../interface_adapters/presenters/ui_presenter.js';
import ApiService from '../interface_adapters/gateways/api_service.js';
import ChartController from '../interface_adapters/controllers/chart_controller.js';
import appState from '../application/app_state.js';

class DashboardApp {
    constructor() {
        this.chartController = null;
    }

    async init() {
        const params = new URLSearchParams(window.location.search);
        const periodo = params.get('periodo');
        let conta = params.get('conta');
        if (typeof conta === 'string') {
            conta = conta.replace(/\./g, '').replace(',', '.');
        }

        await HeaderPresenter.renderHeader();
        LoadingPresenter.showLoading();

        const errors = appState.getErrors && appState.getErrors('apiService');
        if (errors && errors.length > 0) {
            ErrorPresenter.showError(errors[errors.length - 1].message || 'Error desconocido');
            return;
        }

        try {
            let result;
            if (periodo || conta) {
                result = await ApiService.getDashboardData(periodo || undefined, conta || undefined);
            } else {
                result = await ApiService.getDashboardData();
            }
            LoadingPresenter.hideLoading();
            if (result.status === 'success') {
                appState.setInitialData(result.data);
                try {
                    await this._renderDashboard(result.data);
                } catch (err) {
                    ErrorPresenter.showError('Error al renderizar el dashboard.');
                }
                appState.subscribe('chart', async (newChartData) => {
                    try {
                        const initialData = appState.getInitialData();
                        await this._renderDashboard({ ...initialData, ...newChartData });
                    } catch (err) {
                        ErrorPresenter.showError('Error al actualizar el gráfico.');
                    }
                });
                if (!window._scriptsLoaded) {
                        try {
                            console.log("app.js - Cargando scripts dinámicamente");
                            const mainScript = document.createElement('script');
                            mainScript.type = 'module';
                            mainScript.src = 'src/infrastructure/main.js';
                            document.body.appendChild(mainScript);

                            // Corrige la ruta del ChartController
                            const chartScript = document.createElement('script');
                            chartScript.type = 'module';
                            chartScript.src = 'src/interface_adapters/controllers/chart_controller.js';
                            document.body.appendChild(chartScript);
                            window._scriptsLoaded = true;
                        } catch (err) {
                            console.error("app.js - Error al cargar scripts dinámicos:", err);
                            ErrorPresenter.showError('Error al cargar scripts dinámicos.');
                        }
                    }
            } else {
                ErrorPresenter.showError('Error al cargar datos.');
            }
        } catch (e) {
            LoadingPresenter.hideLoading();
            ErrorPresenter.showError('Error de conexión con la API.');
        }
    }

    async _renderDashboard(data) {
        if (!data) return;
        appState.periodo = data.periodo;
        appState.data = data;
        const infoDisplayStructure = UiService.getDashboardDataForRender(data);
        const infoDisplayHtml = await DashboardPresenter.renderInfoDisplay(infoDisplayStructure);
        DashboardPresenter.updateInfoDisplayContainer(infoDisplayHtml);
        if (!this.chartController) {
            const HighchartsGateway = (await import('../interface_adapters/gateways/highcharts_gateway.js')).default;
            this.chartController = new ChartController(new HighchartsGateway(), DashboardPresenter);
        }
        this.chartController.init(appState.getInitialData(), appState.getChartData());
    }

    async changePeriodo(periodo) {
        if (periodo === appState.getChartData()?.periodo) return;
        appState.setLoading('dashboard', true);
        try {
            const result = await ApiService.getDashboardData(periodo);
            appState.setLoading('dashboard', false);
            if (result.status === 'success') {
                appState.setInitialData(result.data);
                await this._renderDashboard(result.data);
            } else {
                appState.addError('dashboard', 'Error al cargar datos.');
                ErrorPresenter.showError('Error al cargar datos.');
            }
        } catch (error) {
            appState.setLoading('dashboard', false);
            appState.addError('dashboard', error);
            ErrorPresenter.showError('Error de conexión con la API.');
        }
    }
}

const dashboardApp = new DashboardApp();
document.addEventListener('DOMContentLoaded', () => dashboardApp.init());
