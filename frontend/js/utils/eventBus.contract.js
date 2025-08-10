/**
 * Contrato de eventos para EventBus local
 * Path: frontend/js/utils/eventBus.contract.js
 *
 * Este archivo define los nombres, payloads y reglas de los eventos utilizados en el sistema.
 * Permite migrar listeners/emisores globales a comunicación local desacoplada.
 *
 * Uso recomendado:
 * - Importar los nombres de eventos desde aquí en todos los módulos.
 * - Validar el payload en los emisores/listeners.
 * - Documentar nuevos eventos aquí antes de implementarlos.
 */

export const EVENT_CONTRACT = {
    // Ejemplo: Evento de actualización de datos del chart
    CHART_DATA_UPDATED: {
        description: 'Se emite cuando los datos del chart cambian',
        payload: '{ chartData: Object }',
    },
    // Ejemplo: Evento de cambio de estado global
    APP_STATE_CHANGED: {
        description: 'Se emite cuando el estado global cambia',
        payload: '{ newState: Object }',
    },
    // Ejemplo: Evento de acción en la botonera
    BUTTON_ACTION: {
        description: 'Se emite cuando se presiona un botón de acción',
        payload: '{ action: String, params: Object }',
    },
    // Agregar aquí nuevos eventos según se migren listeners
};

/**
 * Ejemplo de uso:
 * import { EVENT_CONTRACT } from './eventBus.contract.js';
 * eventBus.emit(EVENT_CONTRACT.CHART_DATA_UPDATED, { chartData });
 * eventBus.subscribe(EVENT_CONTRACT.CHART_DATA_UPDATED, (payload) => { ... });
 */
