// src/interface_adapters/presenters/error_presenter.js
// Presenter para mostrar notificaciones y errores en la UI

export default class ErrorPresenter {
    static showError(message) {
        let errorContainer = document.getElementById('error-notification');
        if (!errorContainer) {
            errorContainer = document.createElement('div');
            errorContainer.id = 'error-notification';
            errorContainer.className = 'alert alert-danger position-fixed top-0 end-0 m-3';
            errorContainer.style.zIndex = '1050';
            document.body.appendChild(errorContainer);
        }
        errorContainer.innerHTML = `<span>${message}</span>`;
        errorContainer.style.display = 'block';
        setTimeout(() => {
            errorContainer.style.display = 'none';
        }, 5000);
    }

    static showNotification(message, type = 'info') {
        let notificationsContainer = document.getElementById('notifications');
        if (!notificationsContainer) {
            notificationsContainer = document.createElement('div');
            notificationsContainer.id = 'notifications';
            notificationsContainer.className = 'position-fixed top-0 end-0 p-3';
            notificationsContainer.style.zIndex = '1050';
            document.body.appendChild(notificationsContainer);
        }
        const notification = document.createElement('div');
        notification.className = `toast align-items-center text-white bg-${type} border-0`;
        notification.role = 'alert';
        notification.setAttribute('aria-live', 'assertive');
        notification.setAttribute('aria-atomic', 'true');
        notification.innerHTML = `
            <div class="d-flex">
                <div class="toast-body">${message}</div>
                <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
            </div>
        `;
        notificationsContainer.appendChild(notification);
        if (window.bootstrap && window.bootstrap.Toast) {
            const toast = new window.bootstrap.Toast(notification, { autohide: true, delay: 5000 });
            toast.show();
        } else {
            notification.style.display = 'block';
            setTimeout(() => notification.remove(), 5000);
        }
        notification.addEventListener('hidden.bs.toast', () => {
            notification.remove();
        });
    }
}
