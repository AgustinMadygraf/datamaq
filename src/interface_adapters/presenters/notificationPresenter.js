export function showNotification(message, type) {
    let notificationsContainer = document.getElementById('ws-notifications');
    if (!notificationsContainer) {
        notificationsContainer = document.createElement('div');
        notificationsContainer.id = 'ws-notifications';
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
            <div class="toast-body">
                ${message}
            </div>
            <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Cerrar"></button>
        </div>
    `;

    notificationsContainer.appendChild(notification);

    const toast = new bootstrap.Toast(notification, { autohide: true, delay: 5000 });
    toast.show();

    notification.addEventListener('hidden.bs.toast', () => {
        notification.remove();
    });
}

export function setStreamLost() {
    const streamImg = document.getElementById('stream-img');
    if (streamImg) {
        streamImg.classList.add('stream-lost');
    }
}

export function setStreamRecovered() {
    const streamImg = document.getElementById('stream-img');
    if (streamImg) {
        streamImg.classList.remove('stream-lost');
    }
}
