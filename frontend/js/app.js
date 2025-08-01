// Cargar dinámicamente el header
fetch('frontend/templates/header.html')
    .then(response => response.text())
    .then(html => {
        document.getElementById('header-container').innerHTML = html;
    });

// Función para mostrar errores en el contenedor principal
function showError(msg) {
    document.getElementById('info-display-container').innerHTML = msg;
}

// Inicialización principal (unificada)
function initDashboard() {
    const loading = document.getElementById('loading-indicator');
    if (loading) loading.style.display = '';
    fetch('backend/api/endpoints/dashboard.php')
        .then(resp => resp.json())
        .then(data => {
            if (loading) loading.style.display = 'none';
            if (data.status === 'success') {
                window.initialData = data.data;
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
                showError('Error al cargar datos.');
            }
        })
        .catch(() => {
            if (loading) loading.style.display = 'none';
            showError('Error de conexión con la API.');
        });
}

// Ejecutar inicialización al cargar el DOM
document.addEventListener('DOMContentLoaded', initDashboard);

// Estado global simple
let appState = {
    periodo: null,
    data: null
};

// Renderiza la botonera y la info principal y recarga el gráfico
function renderDashboard(data) {
    if (!data) return;
    appState.periodo = data.periodo;
    appState.data = data;
    renderInfoDisplay(data);
    // El gráfico ahora se renderiza dentro de renderInfoDisplay
}

    // Renderiza la info de producción
    async function renderInfoDisplay(data) {
        // Cargar la plantilla info_display.html
        const res = await fetch('frontend/templates/info_display.html');
        let html = await res.text();

        // Cargar la plantilla de botonera
        const resBotonera = await fetch('frontend/templates/botonera.html');
        let botoneraHtml = await resBotonera.text();

        // Procesar la botonera con los datos adecuados
        const botoneraData = {
            periodo: data.periodo,
            conta: data.conta,
            preConta: data.uiData?.preConta,
            postConta: data.uiData?.postConta,
            csrfToken: data.csrfToken || '',
            refClass0: data.uiData?.refClass[0],
            refClass1: data.uiData?.refClass[1],
            refClass2: data.uiData?.refClass[2]
        };

        // Reemplazar variables en la botonera
        Object.entries(botoneraData).forEach(([key, value]) => {
            const regex = new RegExp(`{{${key}}}`, 'g');
            botoneraHtml = botoneraHtml.replace(regex, value ?? '');
        });

        // Suponiendo que data.vel_ult_calculada viene del JSON
        const velocidadPorMinuto = Math.round((parseFloat(data.vel_ult_calculada) || 0) / 5);

        // Al preparar los datos para la plantilla:
        const flatData = {
            ...data,
            formato: data.formatoData?.formato || 'No disponible',
            ancho_bobina: data.formatoData?.ancho_bobina || 'No disponible',
            estiloFondo: data.uiData?.estiloFondo || '',
            botonera: botoneraHtml,
            vel_ult_calculada: velocidadPorMinuto // <-- aquí el valor corregido
        };

        // Reemplazar marcadores en la plantilla principal
        Object.entries(flatData).forEach(([key, value]) => {
            if (typeof value !== 'object') { // Solo procesar valores no-objeto
                const regex = new RegExp(`{{${key}}}`, 'g');
                html = html.replace(regex, value ?? '');
            }
        });

        document.getElementById('info-display-container').innerHTML = html;
        // Renderizar el gráfico en el nuevo contenedor
        if (window.ChartController && typeof window.ChartController.initChart === 'function') {
            window.ChartController.initChart();
        } else if (typeof renderGrafico === 'function') {
            renderGrafico(data.rawdata);
        }
    }

// Cambia el período y recarga los datos
window.changePeriodo = function(periodo) {
    if (periodo === appState.periodo) return;
    const loading = document.getElementById('loading-indicator');
    if (loading) loading.style.display = '';
    fetch(`backend/api/endpoints/dashboard.php?periodo=${encodeURIComponent(periodo)}`)
        .then(resp => resp.json())
        .then(data => {
            if (loading) loading.style.display = 'none';
            if (data.status === 'success') {
                window.initialData = data.data;
                renderDashboard(window.initialData);
            } else {
                showError('Error al cargar datos.');
            }
        })
        .catch(() => {
            if (loading) loading.style.display = 'none';
            showError('Error de conexión con la API.');
        });
};
