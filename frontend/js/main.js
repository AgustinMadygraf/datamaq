/*
Path: frontend/js/main.js
*/

import ApiService from './services/ApiService.js';
import UiService from './services/UiService.js';

console.log("main.js cargado correctamente.");

// Función para ocultar el indicador de carga
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
}

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("main.js - DOMContentLoaded iniciado");
        console.log("main.js - Datos iniciales:", window.initialData);
        
        // Obtener periodo y conta de los datos iniciales
        const { periodo, conta } = window.initialData;
        
        console.log("main.js - Iniciando solicitud de datos a la API...");
        const response = await ApiService.getDashboardData(periodo, conta);
        
        if (response.status !== 'success') {
            throw new Error('Error en la respuesta de la API: ' + (response.message || 'No se recibieron datos'));
        }
        
        const data = response.data;
        console.log("main.js - Datos recibidos:", data);

        // Actualizar la interfaz con los datos recibidos
        await UiService.updateDashboard(data);
        
        console.log("main.js - Configurando chartData en window...");
        
        // Configurar el gráfico con los datos recibidos
        window.chartData = {
            conta: data.conta,
            rawdata: data.rawdata,
            ls_periodos: data.ls_periodos,
            menos_periodo: data.menos_periodo,
            periodo: data.periodo
        };
        
        console.log("main.js - window.chartData configurado:", window.chartData);
        console.log("main.js - Disparando evento chartDataReady");
        
        // Disparar evento para que ChartController sepa que los datos están listos
        try {
            const event = new CustomEvent('chartDataReady', { detail: { chartDataSource: 'main.js' } });
            document.dispatchEvent(event);
            console.log("main.js - Evento chartDataReady disparado correctamente");
        } catch (eventError) {
            console.error("main.js - Error al disparar evento chartDataReady:", eventError);
        }
        
        console.log("main.js - Elementos actualizados correctamente.");
    } catch (error) {
        console.error("main.js - Error crítico en la aplicación:", error);
        console.log("main.js - Stack trace:", error.stack);
        
        // Mostrar mensaje de error al usuario
        const container = document.getElementById('info-display-container');
        if (container) {
            container.innerHTML = `
                <div class="alert alert-danger" role="alert">
                    Error al cargar los datos: ${error.message}
                </div>
            `;
        }
    } finally {
        // Ocultar indicador de carga
        hideLoadingIndicator();
    }
});

// Añadir manejador de errores global para debugging
window.addEventListener('error', function(event) {
    console.error('main.js - Error global capturado:', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});
