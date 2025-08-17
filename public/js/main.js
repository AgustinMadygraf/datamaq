/*
Path: public/js/main.js
*/

// Redirigir eventos globales mouseup al event bus usando eventBus importado
window.addEventListener('mouseup', (e) => {
    eventBus.emit(EVENT_CONTRACT.MOUSE_UP, e);
});

import ApiService from '../../src/adapters/services/ApiService.js';
import UiService from '../../src/adapters/services/UiService.js';
import appState from '../../src/application/AppState.js';
import eventBus from '../../src/adapters/eventBus/EventBus.js';
import { EVENT_CONTRACT } from '../../src/adapters/eventBus/eventBus.contract.js';

console.log("main.js cargado correctamente.");

// Función para ocultar el indicador de carga
function hideLoadingIndicator() {
    const loadingIndicator = document.getElementById('loading-indicator');
    if (loadingIndicator) {
        loadingIndicator.style.display = 'none';
    }
    appState.update('loading', { global: false });
}

// Función para notificar que el contenedor del gráfico está listo
function notifyContainerReady() {
    try {
        console.log("main.js - Verificando si el contenedor del gráfico existe");
        const container = document.getElementById('container');
        
        if (container) {
            console.log("main.js - Contenedor del gráfico encontrado", {
                width: container.offsetWidth,
                height: container.offsetHeight,
                isVisible: container.offsetParent !== null
            });
            
            // Si el contenedor no tiene dimensiones, intentar establecerlas
            if (container.offsetWidth === 0 || container.offsetHeight === 0) {
                console.log("main.js - Ajustando dimensiones del contenedor del gráfico");
                container.style.minHeight = '400px';
                container.style.width = '100%';
            }
            
            // Disparar evento para notificar que el contenedor está listo usando event bus
            eventBus.emit('containerReady', {
                containerId: 'container',
                timestamp: Date.now()
            });
            console.log("main.js - Evento containerReady disparado (event bus)");
        } else {
            console.warn("main.js - Contenedor del gráfico aún no existe");
            
            // Buscar elementos con clase 'graf'
            const grafElements = document.querySelectorAll('.graf');
            if (grafElements.length > 0) {
                console.log("main.js - Encontrados elementos con clase 'graf':", grafElements);
                
                // Si hay un elemento con clase 'graf', podemos asignarle el id 'container'
                if (grafElements[0].id !== 'container') {
                    grafElements[0].id = 'container';
                    console.log("main.js - Se asignó id 'container' a un elemento .graf");
                    
                    // Disparar evento ahora que tenemos un contenedor
                    notifyContainerReady();
                    return;
                }
            }
            
            // Si aún no existe, intentar nuevamente en un momento
            setTimeout(notifyContainerReady, 500);
        }
    } catch (error) {
        appState.addError('global', error);
        console.error("main.js - Error al notificar que el contenedor está listo:", error);
    }
}

window.addEventListener("DOMContentLoaded", () => {
    console.log("main.js - DOMContentLoaded iniciado");
    eventBus.emit(EVENT_CONTRACT.APP_DOM_READY, { timestamp: Date.now() });
    // La carga de datos y renderizado ahora está centralizada en app.js
    // Aquí solo se dispara el evento global y se inicializan listeners si es necesario
    notifyContainerReady();
    hideLoadingIndicator();
});

// Mecanismo de verificación global para chartData
window.checkChartDataAvailability = function() {
    const chartData = appState.getState().chartData;
    console.log("Verificación global de chartData:", {
        exists: typeof chartData !== 'undefined',
        value: chartData
    });
    return chartData;
};

// Añadir manejador de errores global para debugging
window.addEventListener('error', function(event) {
    appState.addError('global', event.error || event.message);
    console.error('main.js - Error global capturado:', {
        message: event.message,
        source: event.filename,
        lineno: event.lineno,
        colno: event.colno,
        error: event.error
    });
});
