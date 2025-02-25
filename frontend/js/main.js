/*
Path: frontend/js/main.js
*/
console.log("main.js cargado correctamente.");
document.addEventListener("DOMContentLoaded", async () => {
    try {
        console.log("Iniciando solicitud de datos a la API...");
        const response = await fetch('/DataMaq/backend/api/getDataTest.php');
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        console.log("Datos recibidos:", data);
        try {
            // Actualizar info_display.html
            const velocidadEl = document.getElementById('velocidad');
            if (velocidadEl) {
                velocidadEl.innerText = `Velocidad ${data.velocidad} unidades por minuto`;
            }
            
            const formatoEl = document.getElementById('formato');
            if (formatoEl) {
                formatoEl.innerText = `Formato ${data.formato}`;
            }
            
            const anchoBobinaEl = document.getElementById('anchoBobina');
            if (anchoBobinaEl) {
                anchoBobinaEl.innerText = `Ancho Bobina ${data.anchoBobina}`;
            }
            
            // Inyectar la botonera si existe el contenedor
            const botoneraEl = document.getElementById('botonera');
            if (botoneraEl) {
                botoneraEl.innerHTML = data.botoneraHtml || '';
            }
            
            // Actualizar header si es necesario
            if (data.menuItems) {
                let menuItems = JSON.parse(data.menuItems);
                const menuContainer = document.getElementById('menuItems');
                if (menuContainer) {
                    menuContainer.innerHTML = "";
                    Object.keys(menuItems).forEach(url => {
                        let li = document.createElement('li');
                        li.className = "nav-item";
                        li.innerHTML = `<a class="nav-link" href="${url}">${menuItems[url]}</a>`;
                        menuContainer.appendChild(li);
                    });
                }
            }
            console.log("Elementos actualizados correctamente.");
        } catch (updateError) {
            console.error("Error al actualizar elementos del DOM:", updateError);
        }
    } catch (error) {
        console.error("Error al cargar datos:", error);
    }
});
