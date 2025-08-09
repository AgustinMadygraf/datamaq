/*
Path: frontend/js/app.js
*/

import UiService from './services/UiService.js';
import appState from './state/AppState.js';
import ApiService from './services/ApiService.js';

class DashboardApp {
    constructor() {}

    async init() {
        const params = new URLSearchParams(window.location.search);
        const periodo = params.get('periodo');
        let conta = params.get('conta');
        console.log("app.js - Parámetros de la URL:", { periodo, conta });

        // Normalizar el valor de conta: reemplazar coma por punto
        if (typeof conta === 'string') {
            conta = conta.replace(',', '.');
        }

        // Cargar dinámicamente el header
        fetch('frontend/templates/header.html')
            .then(response => response.text())
            .then(html => {
                document.getElementById('header-container').innerHTML = html;
            });

        const loading = document.getElementById('loading-indicator');
        if (loading) loading.style.display = '';

        try {
            let result;
            // Solo pasa los parámetros si existen
            if (periodo || conta) {
                result = await ApiService.getDashboardData(
                    periodo ? periodo : undefined,
                    conta ? conta : undefined
                );
            } else {
                result = await ApiService.getDashboardData();
            }
            if (loading) loading.style.display = 'none';
            if (result.status === 'success') {
                appState.setInitialData(result.data);
                this._renderDashboard(result.data);
                // Cargar scripts solo una vez
                if (!window._scriptsLoaded) {
                    const mainScript = document.createElement('script');
                    mainScript.type = 'module';
                    mainScript.src = 'frontend/js/main.js';
                    document.body.appendChild(mainScript);

                    const chartScript = document.createElement('script');
                    chartScript.type = 'module';
                    chartScript.src = 'frontend/js/modules/ChartController.js';
                    document.body.appendChild(chartScript);
                    window._scriptsLoaded = true;
                }
            } else {
                UiService.showError('Error al cargar datos.');
            }
        } catch (e) {
            if (loading) loading.style.display = 'none';
            UiService.showError('Error de conexión con la API.');
        }
    }

    async _renderDashboard(data) {
        if (!data) return;
        appState.periodo = data.periodo;
        appState.data = data;
        await UiService.updateDashboard(data);
    }

    async changePeriodo(periodo) {
        // Evitar recarga si el periodo no cambia
        if (periodo === appState.getChartData()?.periodo) return;

        // Centralizar el estado de carga usando AppState
        appState.setLoading('dashboard', true);

        try {
            // Usar ApiService para obtener los datos del nuevo periodo
            const result = await ApiService.getDashboardData(periodo);

            // Finalizar estado de carga
            appState.setLoading('dashboard', false);

            if (result.status === 'success') {
                // Actualizar el estado centralizado con los nuevos datos
                appState.setInitialData(result.data);
                // Actualizar la UI en base al estado
                await UiService.updateDashboard(result.data);
            } else {
                // Registrar error en el estado centralizado
                appState.addError('dashboard', 'Error al cargar datos.');
                UiService.showError('Error al cargar datos.');
            }
        } catch (error) {
            appState.setLoading('dashboard', false);
            appState.addError('dashboard', error);
            UiService.showError('Error de conexión con la API.');
        }
    }
}

const dashboardApp = new DashboardApp();
document.addEventListener('DOMContentLoaded', () => dashboardApp.init());

// Expón el método como función global si es necesario para la botonera
window.changePeriodo = async function(periodo) {
    await dashboardApp.changePeriodo(periodo);
};
