/*
Path: src/interface_adapters/presenters/dashboard_presenter.js
*/

import { PresenterContract } from './presenter_contract.js';

export default class DashboardPresenter extends PresenterContract {
    static renderInfoDisplay(infoDisplayStructure) {
        // Importa el componente funcional para renderizar el HTML
        // (Se asume que renderInfoDisplay devuelve un string HTML)
        return import('../../interface_adapters/controllers/info_display.js')
            .then(({ renderInfoDisplay }) => renderInfoDisplay(infoDisplayStructure));
    }

    static updateInfoDisplayContainer(html) {
        const container = document.getElementById('info-display-container');
        if (container) {
            container.innerHTML = html;
        } else {
            console.warn('DashboardPresenter - No se encontró el contenedor info-display-container');
        }
    }
}
