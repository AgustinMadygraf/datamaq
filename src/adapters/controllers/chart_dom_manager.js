/*
Path: src/adapters/controllers/ChartDomManager.js
*/

export default class ChartDomManager {
    /**
     * Espera a que el contenedor esté disponible en el DOM
     * @param {string} containerId - ID del contenedor
     * @param {number} maxWaitTime - Tiempo máximo de espera en ms
     * @param {number} interval - Intervalo de verificación en ms
     * @returns {Promise<HTMLElement>} - Elemento contenedor
     */
    async waitForContainer(containerId = 'container', maxWaitTime = 5000, interval = 200) {
        const start = Date.now();
        return new Promise((resolve, reject) => {
            const check = () => {
                const el = document.getElementById(containerId);
                if (el) return resolve(el);
                if (Date.now() - start > maxWaitTime) return reject(new Error('Contenedor no disponible'));
                setTimeout(check, interval);
            };
            check();
        });
    }

    /**
     * Crea el contenedor si no existe y lo agrega al padre
     * @param {string} parentId - ID del elemento padre
     * @param {string} containerId - ID del nuevo contenedor
     * @param {string} className - Clase CSS para el contenedor
     * @returns {HTMLElement|null} - Nuevo contenedor o null si no se pudo crear
     */
    createContainer(parentId, containerId = 'container', className = 'graf') {
        const parent = document.getElementById(parentId);
        if (!parent) return null;
        let container = document.getElementById(containerId);
        if (!container) {
            container = document.createElement('div');
            container.id = containerId;
            container.className = className;
            parent.appendChild(container);
        }
        return container;
    }

    /**
     * Verifica si el contenedor es visible en el DOM
     * @param {HTMLElement} container
     * @returns {boolean}
     */
    isContainerVisible(container) {
        return !!(container && container.offsetParent !== null);
    }

    /**
     * Obtiene las dimensiones del contenedor
     * @param {HTMLElement} container
     * @returns {{width: number, height: number}}
     */
    getContainerDimensions(container) {
        if (!container) return { width: 0, height: 0 };
        return {
            width: container.offsetWidth,
            height: container.offsetHeight
        };
    }
}
