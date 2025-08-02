/*
Path: frontend/js/app.js
*/

import UiService from './services/UiService.js';
import ApiService from './services/ApiService.js';
import appState from './state/AppState.js';

// Cargar dinámicamente el header
fetch('frontend/templates/header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header-container').innerHTML = html;
    });


// Inicialización principal (unificada)
function initDashboard() {
    const loading = document.getElementById('loading-indicator');
    if (loading) loading.style.display = '';

    // Usar ApiService para obtener los datos del dashboard
    ApiService.getDashboardData()
        .then(result => {
            if (loading) loading.style.display = 'none';
            if (result.status === 'success') {
                window.initialData = result.data;
                renderDashboard(window.initialData);
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
        })
        .catch(() => {
            if (loading) loading.style.display = 'none';
            UiService.showError('Error de conexión con la API.');
        });
}

// Ejecutar inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', initDashboard);

// Renderiza la botonera y la info principal y recarga el gráfico
async function renderDashboard(data) {
    if (!data) return;
    appState.periodo = data.periodo;
    appState.data = data;
    // Delegar el renderizado completo a UiService
    await UiService.updateDashboard(data);
}

// Cambia el período y recarga los datos usando los servicios centralizados
window.changePeriodo = async function(periodo) {
    // Evitar recarga si el periodo no cambia
    if (periodo === appState.getChartData().periodo) return;

    const loading = document.getElementById('loading-indicator');
    if (loading) loading.style.display = '';

    try {
        // Usar ApiService para obtener los datos del nuevo periodo
        const result = await ApiService.getDashboardData(periodo);

        if (loading) loading.style.display = 'none';

        if (result.status === 'success') {
            window.initialData = result.data;
            await UiService.updateDashboard(result.data);
        } else {
            UiService.showError('Error al cargar datos.');
        }
    } catch (error) {
        if (loading) loading.style.display = 'none';
        UiService.showError('Error de conexión con la API.');
    }
};
