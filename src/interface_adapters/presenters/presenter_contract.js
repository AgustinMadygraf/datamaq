/*
Path: src/interface_adapters/presenters/presenter_contract.js
*/

export class PresenterContract {
    /**
     * Muestra un error en la UI
     * @param {string} message
     */
    showError(message) {
        throw new Error('Método showError no implementado');
    }

    /**
     * Muestra una notificación en la UI
     * @param {string} message
     * @param {string} type
     */
    showNotification(message, type = 'info') {
        throw new Error('Método showNotification no implementado');
    }

    /**
     * Renderiza el info-display
     * @param {Object} infoDisplayStructure
     */
    renderInfoDisplay(infoDisplayStructure) {
        throw new Error('Método renderInfoDisplay no implementado');
    }
}
