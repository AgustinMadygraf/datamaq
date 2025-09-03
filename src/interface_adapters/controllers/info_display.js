/*
Path: js/components/info_display.js
Componente funcional para renderizar el info-display a partir de una estructura de datos
*/

import { renderBotonera } from '../../infrastructure/ui/botonera.js';
import { sanitizeHTML } from '../../infrastructure/dom_utils.js';
export function renderInfoDisplay(structure) {
    // Función auxiliar para renderizar nodos
    function renderNode(node) {
        try {
            if (Array.isArray(node)) {
                return node.map(renderNode).join('');
            }
            switch (node.type) {
                case 'hoja':
                    return `<div class="hoja" style="${sanitizeHTML(node.style)}">${renderNode(node.children)}</div>`;
                case 'info':
                    return `<div class="info">${renderNode(node.children)}</div>`;
                case 'cabecera':
                    return `<div class="cabecera">${renderNode(node.children)}</div>`;
                case 'c1':
                    return `<div class="c1">${renderNode(node.children)}</div>`;
                case 'p2':
                    return `<p2>${sanitizeHTML(node.text)}</p2>`;
                case 'p1':
                    return `<p1>${sanitizeHTML(node.text)}</p1>`;
                case 'graf':
                    if (!node.id) {
                        console.warn('[InfoDisplay] Nodo graf sin id:', node);
                        return '';
                    }
                    return `<div id="${sanitizeHTML(node.id)}" class="graf" style="${sanitizeHTML(node.style)}"></div>`;
                case 'botonera-container':
                    // Renderiza la botonera usando la estructura
                    return `<div class="botonera-container">${renderBotonera(node.children)}</div>`;
                default:
                    console.warn('[InfoDisplay] Tipo de nodo desconocido:', node);
                    return '';
            }
        } catch (err) {
            console.error('[InfoDisplay] Error al renderizar nodo:', node, err);
            return '';
        }
    }
    try {
        return renderNode(structure);
    } catch (err) {
        console.error('[InfoDisplay] Error al renderizar estructura:', structure, err);
        return '<div class="error">Error al renderizar el dashboard.</div>';
    }
}
