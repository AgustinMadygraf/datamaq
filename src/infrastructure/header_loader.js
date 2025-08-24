/*
Path: public/js/header_loader.js
*/

export function loadHeader(headerPath = 'public/templates/header.html', containerId = 'header-container') {
    fetch(headerPath)
        .then(response => {
            if (!response.ok) throw new Error('No se pudo cargar el header');
            return response.text();
        })
        .then(html => {
            const headerContainer = document.getElementById(containerId);
            if (headerContainer) {
                headerContainer.innerHTML = html;
                const navLinks = headerContainer.querySelectorAll('.nav-link');
                const currentFile = window.location.pathname.split('/').pop();
                navLinks.forEach(link => {
                    const href = link.getAttribute('href');
                    if (href) {
                        const linkFile = href.split('/').pop();
                        if (linkFile === currentFile) {
                            link.classList.add('active');
                            link.setAttribute('aria-current', 'page');
                        } else {
                            link.classList.remove('active');
                            link.removeAttribute('aria-current');
                        }
                    }
                });
            }
        })
        .catch(err => {
            const headerContainer = document.getElementById(containerId);
            if (headerContainer) {
                headerContainer.innerHTML = `<div class="alert alert-warning" role="alert">No se pudo cargar el menú de navegación.</div>`;
            }
            console.error('Error al cargar el header:', err);
        });
}