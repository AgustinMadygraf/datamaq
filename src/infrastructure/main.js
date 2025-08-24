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