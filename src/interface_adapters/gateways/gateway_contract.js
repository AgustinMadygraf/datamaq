/*
Path: src/interface_adapters/gateways/gateway_contract.js
*/

export class GatewayContract {
    /**
     * Crea y renderiza un gráfico
     * @param {string|HTMLElement} container
     * @param {Object} config
     * @returns {Object|null}
     */
    createChart(container, config) {
        throw new Error('Método createChart no implementado');
    }

    /**
     * Actualiza el gráfico existente
     * @param {Object} chart
     * @param {Object} newData
     */
    updateChart(chart, newData) {
        throw new Error('Método updateChart no implementado');
    }

    /**
     * Destruye el gráfico existente
     * @param {Object} chart
     */
    destroyChart(chart) {
        throw new Error('Método destroyChart no implementado');
    }
}
