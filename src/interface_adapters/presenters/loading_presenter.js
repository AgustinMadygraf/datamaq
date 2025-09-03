/*
Path: src/interface_adapters/presenters/loading_presenter.js
Responsabilidad: Gestiona la visualización y ocultación del indicador de carga en el DOM.
*/

export default class LoadingPresenter {
    static showLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.style.display = '';
        } else {
            console.warn('LoadingPresenter - No se encontró el indicador de carga');
        }
    }

    static hideLoading() {
        const loading = document.getElementById('loading-indicator');
        if (loading) {
            loading.style.display = 'none';
        } else {
            console.warn('LoadingPresenter - No se encontró el indicador de carga');
        }
    }
}
