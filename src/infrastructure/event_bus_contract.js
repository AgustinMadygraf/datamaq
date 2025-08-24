/*
Path: src/infrastructure/event_bus.contract.js
*/

export const EVENT_CONTRACT = {
    // Evento de actualización de datos del chart
    CHART_DATA_UPDATED: {
        description: 'Se emite cuando los datos del chart cambian',
        payload: '{ chartData: Object }',
    },
    // Evento de cambio de estado global
    APP_STATE_CHANGED: {
        description: 'Se emite cuando el estado global cambia',
        payload: '{ newState: Object }',
    },
    // Evento de acción en la botonera
    BUTTON_ACTION: {
        description: 'Se emite cuando se presiona un botón de acción',
        payload: '{ action: String, params: Object }',
    },
    // Evento: el contenedor del gráfico está listo
    containerReady: {
        description: 'Se emite cuando el contenedor del gráfico está disponible en el DOM',
        payload: '{ containerId: String, timestamp: Number }',
    },
    // Evento: el DOM principal de la app está listo
    appDomReady: {
        description: 'Se emite cuando el DOM principal de la app está listo',
        payload: '{ timestamp: Number }',
    },
};
