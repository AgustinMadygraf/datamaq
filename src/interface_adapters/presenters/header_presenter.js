/*
Path: src/interface_adapters/presenters/header_presenter.js
Responsabilidad: Gestiona la carga y renderizado del header en el DOM.
*/

export default class HeaderPresenter {
    static async renderHeader(templatePath = 'public/templates/header.html') {
        try {
            const response = await fetch(templatePath);
            if (!response.ok) {
                console.error('HeaderPresenter - Error al cargar el header:', response.status);
                throw new Error('No se pudo cargar el header');
            }
            const html = await response.text();
            HeaderPresenter.updateHeaderContainer(html);
            return true;
        } catch (err) {
            console.error('HeaderPresenter - Error en la carga dinámica del header:', err);
            HeaderPresenter.showError('No se pudo cargar el header.');
            return false;
        }
    }

    static updateHeaderContainer(html) {
        const headerContainer = document.getElementById('header-container');
        if (headerContainer) {
            headerContainer.innerHTML = html;
        } else {
            console.warn('HeaderPresenter - No se encontró el contenedor header-container');
        }
    }

    static showError(message) {
        import('./error_presenter.js').then(({ default: ErrorPresenter }) => {
            ErrorPresenter.showError(message);
        });
    }
}
