/*
Path: frontend/js/services/UiService.js
*/

class UiService {
    /**
     * Actualiza los elementos de información en pantalla
     * @param {Object} data Datos a mostrar
     */
    static updateInfoDisplay(data) {
        const elements = {
            velocidad: `Velocidad ${data.velocidad} unidades por minuto`,
            formato: `Formato ${data.formato}`,
            anchoBobina: `Ancho Bobina ${data.anchoBobina}`
        };

        Object.entries(elements).forEach(([id, text]) => {
            const element = document.getElementById(id);
            if (element) element.innerText = text;
        });
    }

    /**
     * Actualiza el menú de navegación
     * @param {Object} menuItems Items del menú
     */
    static updateNavMenu(menuItems) {
        if (!menuItems) return;

        const menuContainer = document.getElementById('menuItems');
        if (!menuContainer) return;

        menuContainer.innerHTML = '';
        Object.entries(menuItems).forEach(([url, title]) => {
            const li = document.createElement('li');
            li.className = 'nav-item';
            li.innerHTML = `<a class="nav-link" href="${url}">${title}</a>`;
            menuContainer.appendChild(li);
        });
    }
}

export default UiService;