/*
Path: src/interface_adapters/presenters/ui_presenter.js
Este servicio se encarga de actualizar la interfaz de usuario con los datos recibidos de la API.
*/

import appState from '../../application/app_state.js';
import eventBus from '../../infrastructure/event_bus.js';
class UiService {
    /**
     * Actualiza el dashboard completo con los datos recibidos
     * @param {Object} data - Datos recibidos de la API
     */
    /**
     * Ahora solo retorna la estructura de datos para el info-display
     * El controlador externo debe encargarse del renderizado y manipulación del DOM
     */
    static getDashboardDataForRender(data) {
        try {
            const infoDisplayStructure = this.getInfoDisplayStructure(data);
            return infoDisplayStructure;
        } catch (error) {
            console.error('UiService - Error en getDashboardDataForRender:', error);
            throw error;
        }
    }
    
    /**
     * Genera el HTML para el info-display
     * @param {Object} data - Datos recibidos de la API
     * @returns {string} HTML generado
     */
    /**
     * Nueva función pura: retorna la estructura del info-display como objeto
     * @param {Object} data - Datos recibidos de la API
     * @returns {Object} Estructura del info-display
     */
    static getInfoDisplayStructure(data) {
        const { vel_ult_calculada, formatoData } = data;
        const { formato, ancho_bobina } = formatoData || {};
        // Soporte dual: si uiData existe, úsalo; si no, deriva estilos localmente
        let estiloFondo = '';
        if (data.uiData && data.uiData.estiloFondo) {
            estiloFondo = data.uiData.estiloFondo;
        } else {
            // Derivar estilo localmente usando datos numéricos (ejemplo básico)
            // Puedes mejorar esta lógica según tus reglas de negocio
            if (vel_ult_calculada > 100) {
                estiloFondo = 'background: linear-gradient(90deg, #6baa22, #6baa22);';
            } else if (vel_ult_calculada > 50) {
                estiloFondo = 'background: linear-gradient(90deg, #6baa22, #6baa22);';
            } else {
                estiloFondo = 'background: linear-gradient(90deg, #6baa22, #6baa22);';
            }
        }
        const containerId = 'container';
        return {
            type: 'hoja',
            style: estiloFondo,
            children: [
                {
                    type: 'info',
                    children: [
                        {
                            type: 'cabecera',
                            children: [
                                {
                                    type: 'c1',
                                    children: [
                                        { type: 'p2', text: `Velocidad ${vel_ult_calculada} unidades por minuto` },
                                        { type: 'p1', text: `Formato ${formato}` },
                                        { type: 'p2', text: `Ancho Bobina ${ancho_bobina}` }
                                    ]
                                }
                            ]
                        },
                        {
                            type: 'graf',
                            id: containerId,
                            style: 'min-height: 400px;',
                            children: []
                        },
                        {
                            type: 'botonera-container',
                            children: this.getBotoneraStructure(data)
                        }
                    ]
                }
            ]
        };
    }

    /**
     * Genera el HTML para la botonera
     * @param {Object} data - Datos recibidos de la API
     * @returns {string} HTML generado
     */
    /**
     * Nueva función pura: retorna la estructura de la botonera como array de objetos
     * @param {Object} data - Datos recibidos de la API
     * @returns {Array} Estructura de la botonera
     */
    static getBotoneraStructure(data) {
        const { periodo, conta } = data;
        // Soporte dual: si uiData existe, úsalo; si no, deriva localmente
        let refClass, preConta, postConta;
        if (data.uiData) {
            refClass = data.uiData.refClass;
            preConta = data.uiData.preConta;
            postConta = data.uiData.postConta;
        } else {
            // Derivar clases y valores por defecto (ajusta según tu lógica de negocio)
            refClass = ['presione', 'presione', 'presione'];
            preConta = (typeof conta === 'number' ? conta - 1 : '');
            postConta = (typeof conta === 'number' ? conta + 1 : '');
        }
        const csrfToken = (typeof appState.getInitialData === 'function' ? appState.getInitialData().csrfToken : '') || '';
        return [
            {
                type: 'form',
                action: `?periodo=${periodo}&conta=${preConta}`,
                method: 'post',
                className: 'botonI',
                inputs: [
                    { type: 'hidden', name: 'csrf_token', value: csrfToken },
                    { type: 'submit', value: `${periodo} anterior`, className: 'presione' }
                ]
            },
            { type: 'spacer' },
            {
                type: 'form',
                action: `?periodo=semana&conta=${conta}`,
                method: 'post',
                className: 'periodo',
                inputs: [
                    { type: 'hidden', name: 'csrf_token', value: csrfToken },
                    { type: 'submit', value: 'semana', className: refClass[0] }
                ]
            },
            {
                type: 'form',
                action: `?periodo=turno&conta=${conta}`,
                method: 'post',
                className: 'periodo',
                inputs: [
                    { type: 'hidden', name: 'csrf_token', value: csrfToken },
                    { type: 'submit', value: 'turno', className: refClass[1] }
                ]
            },
            {
                type: 'form',
                action: `?periodo=hora&conta=${conta}`,
                method: 'post',
                className: 'periodo',
                inputs: [
                    { type: 'hidden', name: 'csrf_token', value: csrfToken },
                    { type: 'submit', value: '2 horas', className: refClass[2] }
                ]
            },
            { type: 'spacer' },
            {
                type: 'form',
                action: `?periodo=${periodo}&conta=${postConta}`,
                method: 'post',
                className: 'botonD',
                inputs: [
                    { type: 'hidden', name: 'csrf_token', value: csrfToken },
                    { type: 'submit', value: `${periodo} siguiente`, className: 'presione' }
                ]
            },
            {
                type: 'form',
                action: `?periodo=${periodo}`,
                method: 'post',
                className: 'fin',
                inputs: [
                    { type: 'hidden', name: 'csrf_token', value: csrfToken },
                    { type: 'submit', value: '>|', className: 'presione' }
                ]
            }
        ];
    }

    /**
     * Wrapper temporal para compatibilidad: genera HTML a partir de la estructura
     */
    static generateBotoneraHtml(data) {
        try {
            const structure = this.getBotoneraStructure(data);
            let html = '<div class="botonera">';
            for (const item of structure) {
                if (item.type === 'spacer') {
                    html += "<div class='spacer'></div>";
                } else if (item.type === 'form') {
                    html += `<form action="${item.action}" method="${item.method}" class="${item.className}">`;
                    for (const input of item.inputs) {
                        if (input.type === 'hidden') {
                            html += `<input type="hidden" name="${input.name}" value="${input.value}">`;
                        } else if (input.type === 'submit') {
                            html += `<input type="submit" value="${input.value}" class="${input.className}">`;
                        }
                    }
                    html += '</form>';
                }
            }
            html += '</div>';
            return html;
        } catch (error) {
            return `<div class="alert alert-danger">Error en la botonera: ${error.message}</div>`;
        }
    }
    
    /**
     * Configura event listeners para los botones de la botonera
     */
    static setupBotoneraEventListeners() {
        // Implementar la funcionalidad de los botones utilizando AJAX en lugar de envío de formulario
        const forms = document.querySelectorAll('.botonera form');

        forms.forEach(form => {
            form.addEventListener('submit', (e) => {
                e.preventDefault();

                // Extraer periodo y conta de la URL del formulario
                const action = form.getAttribute('action');
                const params = new URLSearchParams(action.split('?')[1]);
                const periodo = params.get('periodo');
                const conta = params.get('conta');

                // Emitir evento en el event bus para manejar la acción de la botonera
                eventBus.emit('botoneraSubmit', { periodo, conta, action });
            });
        });
    }

    /**
     * Muestra un mensaje de error en la interfaz
     * @param {string} message - Mensaje de error a mostrar
     */
    static showError(message) {
        // Delegar el manejo de errores a ErrorPresenter para mantener consistencia
        import('./error_presenter.js').then(({ default: ErrorPresenter }) => {
            ErrorPresenter.showError(message);
        });
    }
}

export default UiService;