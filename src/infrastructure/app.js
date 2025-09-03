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
import eventBus from './event_bus.js';
import PeriodicUpdateService from './periodic_update_service.js';
import FetchDashboardUpdatesUseCase from '../use_cases/fetch_dashboard_updates.js';
import ChartDataValidator from '../entities/chart_data_validator.js';

class DashboardApp {
    constructor() {
        this.chartController = null;
        this.updateService = new PeriodicUpdateService();
        this.fetchUpdatesUseCase = new FetchDashboardUpdatesUseCase(new ChartDataValidator());
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
                        // Delegar notificación de carga de scripts a ErrorPresenter en caso de error
                        const chartScript = document.createElement('script');
                        chartScript.type = 'module';
                        chartScript.src = 'src/interface_adapters/controllers/chart_controller.js';
                        document.body.appendChild(chartScript);
                        window._scriptsLoaded = true;
                    } catch (err) {
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

        // Iniciar el servicio de actualización periódica
        this.updateService.start(async () => {
            await this.checkForUpdates();
        });
    }

    async checkForUpdates() {
        try {
            const currentData = appState.getChartData();
            const initialData = appState.getInitialData();
            const periodo = initialData.periodo;
            const conta = initialData.conta;

            // Usar el caso de uso para verificar actualizaciones
            const result = await this.fetchUpdatesUseCase.execute(
                currentData, 
                periodo, 
                conta
            );

            if (result.hasUpdates) {
                // Actualizar el estado y notificar a través del event bus
                appState.setChartData(result.newData);
                eventBus.emit('AUTO_DATA_UPDATED', { 
                    chartData: result.newData,
                    timestamp: new Date().getTime()
                });
            }
            return result.hasUpdates; // <-- Agrega este return
        } catch (error) {
            appState.addError('periodicUpdate', error);
            console.error('Error en actualización periódica:', error);
            return false; // <-- O retorna false en caso de error
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




// Emitir evento global mouseup
window.addEventListener('mouseup', (e) => {
    eventBus.emit('MOUSE_UP', e);
});

// Emitir evento cuando el DOM está listo
window.addEventListener("DOMContentLoaded", () => {
    eventBus.emit('appDomReady', { timestamp: Date.now() });
});

// Emitir evento cuando el contenedor del gráfico está listo
function emitContainerReady() {
    const container = document.getElementById('container');
    if (container) {
        eventBus.emit('containerReady', {
            containerId: 'container',
            timestamp: Date.now()
        });
    }
}
window.addEventListener("DOMContentLoaded", emitContainerReady);

// Emitir error global al eventBus
window.addEventListener('error', function(event) {
    eventBus.emit('GLOBAL_ERROR', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});

// Exponer verificación global de chartData solo como evento
window.checkChartDataAvailability = function() {
    eventBus.emit('CHECK_CHART_DATA', { chartData: appState.getState().chartData });
};

document.addEventListener('mouseup', function(e) {
    eventBus.emit('MOUSE_UP_RAW', e);
});
        loadHeader();

export function loadHeader(headerPath = 'public/templates/header.html', containerId = 'header-container') {
    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el header');
            return response.text();
        })
        .then(html => {
            const headerContainer = document.getElementById(containerId);
            if (headerContainer) {
                headerContainer.innerHTML = html;
                const navLinks = headerContainer.querySelectorAll('.nav-link');
                const currentFile = window.location.pathname.split('/').pop();
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const linkFile = href.split('/').pop();
                        if (linkFile === currentFile) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        } else {
                            link.classList.remove('active');
                            link.removeAttribute('aria-current');
                        }
                    }
                });
            }
        })
        .catch(err => {
            const headerContainer = document.getElementById(containerId);
            if (headerContainer) {
                headerContainer.innerHTML = `<div class="alert alert-warning" role="alert">No se pudo cargar el menú de navegación.</div>`;
            }
            console.error('Error al cargar el header:', err);
        });
}



const dashboardApp = new DashboardApp();
document.addEventListener('DOMContentLoaded', () => dashboardApp.init());
