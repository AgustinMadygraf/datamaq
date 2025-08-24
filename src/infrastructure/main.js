/*
Path: src/infrastructure/main.js
*/

import appState from '../application/app_state.js';
import eventBus from './event_bus.js';


console.log("main.js cargado correctamente.");

// Emitir evento global mouseup
window.addEventListener('mouseup', (e) => {
    eventBus.emit('MOUSE_UP', e);
});

// Emitir evento cuando el DOM está listo
window.addEventListener("DOMContentLoaded", () => {
    console.log("main.js - DOMContentLoaded iniciado");
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
