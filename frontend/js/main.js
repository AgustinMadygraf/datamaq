/*
Path: frontend/js/main.js
*/

import ApiService from './services/ApiService.js';
import UiService from './services/UiService.js';

console.log("main.js cargado correctamente.");

document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("Iniciando solicitud de datos a la API...");
        const data = await ApiService.getStatusData();
        console.log("Datos recibidos:", data);

        // Actualizar la interfaz de usuario
        UiService.updateInfoDisplay(data);
        
        // Actualizar menú si hay datos disponibles
        if (data.menuItems) {
            UiService.updateNavMenu(JSON.parse(data.menuItems));
        }

        // Actualizar botonera si existe
        const botoneraEl = document.getElementById('botonera');
        if (botoneraEl && data.botoneraHtml) {
            botoneraEl.innerHTML = data.botoneraHtml;
        }

        console.log("Elementos actualizados correctamente.");
    } catch (error) {
        console.error("Error en la aplicación:", error);
    }
});
