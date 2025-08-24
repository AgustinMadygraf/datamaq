/*
Path: src/infrastructure/ui/info_display_view.js
*/

export class InfoDisplayView {
    /**
     * Genera el HTML para el info-display a partir de la estructura de datos
     * @param {Object} structure - Estructura de datos del info-display
     * @returns {string} HTML generado
     */
    static render(structure) {
        // Importa la función funcional si existe
        // Si no, implementa aquí la lógica de renderizado
        if (!structure) return '';
        // Se asume que existe src/adapters/controllers/info_display.js con renderInfoDisplay
        // Si no existe, implementar aquí la lógica
        return import('../../adapters/controllers/info_display.js')
            .then(({ renderInfoDisplay }) => renderInfoDisplay(structure));
    }

    /**
     * Actualiza el contenedor del info-display en el DOM
     * @param {string} html - HTML generado
     * @param {string} containerId - ID del contenedor
     */
    static updateContainer(html, containerId = 'info-display-container') {
        const container = document.getElementById(containerId);
        if (container) {
            container.innerHTML = html;
            console.log('InfoDisplayView - Contenedor actualizado');
        } else {
            console.warn('InfoDisplayView - No se encontró el contenedor', containerId);
        }
    }
}
