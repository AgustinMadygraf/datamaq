## 1. Desacoplar el Consumo de Datos del Gráfico (chart_viewer.js) mediante API

**Título:**  
Adaptar el endpoint de Dashboard para que retorne la información en formato JSON y modificar el script de gráficos para consumir estos datos de forma asíncrona.

**Dependencias:**  
- DashboardController, DashboardModel, DashboardService  
- Endpoint API en backend (dashboard.php)  
- Frontend JavaScript (chart_viewer.js)

**Subtareas:**

1.1. **Implementar un Script de Consumo de Datos de Prueba en el Navegador**  
   - **Archivos involucrados:**  
     - Nuevo archivo de prueba, por ejemplo, `chart_viewer_test.js` ubicado en js  
   - **Acción a realizar:**  
     Crear un script JavaScript experimental que utilice Fetch API para consumir el endpoint experimental, procesar la respuesta y mostrar datos en consola o en un contenedor de prueba sin interferir con el script principal.  
   - **Justificación detallada:**  
     Permite verificar en tiempo real el comportamiento del consumo de datos sin afectar el gráfico ya desplegado para los usuarios.
   - **Archivos de referencia:**  
     Documentación de Fetch API y ejemplos de uso en el entorno actual.

1.2. **Integrar un Mecanismo de Feature Flag en chart_viewer.js**  
   - **Archivos involucrados:**  
     - `chart_viewer.js`  
   - **Acción a realizar:**  
     Actualizar el script principal para incluir un flag que permita alternar entre el consumo de datos mediante la inyección tradicional y la nueva carga a través de Fetch API. Inicialmente, mantener ambas lógicas coexistiendo, usando la versión estable como fallback.  
   - **Justificación detallada:**  
     La integración mediante feature flag brinda flexibilidad, permitiendo activar la nueva funcionalidad de manera progresiva y revertir rápidamente en caso de problemas, sin dejar de servir contenido consistente en producción.
   - **Archivos de referencia:**  
     La versión experimental del script y pruebas realizadas con `chart_viewer_test.js`.

1.3. **Realizar Pruebas Piloto en Navegadores y Monitorear Impacto**  
   - **Archivos involucrados:**  
     - Navegadores de prueba (uso colaborativo)  
     - Consola y herramientas de monitoreo (logs y posiblemente herramientas de APM)  
   - **Acción a realizar:**  
     Hacer pruebas en ambiente real con un grupo reducido de usuarios o mediante un entorno de staging. Validar tanto la respuesta JSON del endpoint como el comportamiento del gráfico al consumirlo asíncronamente.  
   - **Justificación detallada:**  
     Garantizar que el cambio no afecte la experiencia del usuario en producción y detectar posibles problemas en tiempo real.
   - **Archivos de referencia:**  
     Logs de `dashboard_test.php`, consola del navegador y reportes de monitoreo.

1.4. **Implementar Gradualmente el Cambio en Producción**  
   - **Archivos involucrados:**  
     - `dashboard.php` (actualizar a la nueva lógica)  
     - `chart_viewer.js` (desactivar o activar el feature flag para todos)  
   - **Acción a realizar:**  
     Una vez validados en ambiente de prueba, migrar la versión experimental a producción de forma progresiva, activando la nueva funcionalidad para un porcentaje incremental de usuarios o según la configuración del feature flag.
   - **Justificación detallada:**  
     La migración progresiva minimiza riesgos, permitiendo observar el impacto y realizar ajustes antes de una adopción completa.
   - **Archivos de referencia:**  
     Resultados de pruebas piloto y documentación de despliegue gradual.


---

## 2. Transformar las Vistas PHP a Plantillas Estáticas de Frontend

**Título:**  
Extraer la lógica de presentación incrustada en vistas PHP para utilizar archivos HTML estáticos que consuman datos a través de la API.

**Dependencias:**  
- Vistas actuales (info_display.php, header.php, botonera.php)  
- Plantillas HTML en templates

**Subtareas:**

- **Título de la subtarea:** Revisar y ajustar la plantilla info_display  
  - **Archivos involucrados:**  
    - info_display.html  
  - **Acción a realizar:** Eliminar la dependencia de marcadores de sustitución inyectados desde el backend y documentar el esquema de datos esperado para ser completado vía JavaScript.  
  - **Justificación detallada:** Esta acción es fundamental para separar la presentación de la lógica de negocio, lo que facilitará la migración progresiva y la futura adopción de frameworks modernos.  
  - **Archivos de referencia:** info_display.php, DashboardController.php

- **Título de la subtarea:** Ajustar las plantillas header y botonera  
  - **Archivos involucrados:**  
    - header.html  
    - botonera.html  
  - **Acción a realizar:** Aplicar un enfoque similar al de info_display, dejando las plantillas como archivos estáticos y removiendo lógica PHP, de modo que sean completados por código JavaScript consumiendo la API (por ejemplo, para el menú y botones de navegación).  
  - **Justificación detallada:** Al transformar estas vistas, se elimina la lógica de renderizado en el servidor, facilitando cambios en la interfaz sin modificar el backend.  
  - **Archivos de referencia:** header.php, botonera.php

---

## 3. Consolidar el Enrutamiento de la API

**Título:**  
Centralizar y ampliar la capa de enrutamiento para la API en la aplicación.

**Dependencias:**  
- Router y endpoints actuales en Router.php  
- Futuras extensiones de API

**Subtareas:**

- **Título de la subtarea:** Revisar y ampliar Router.php  
  - **Archivos involucrados:**  
    - Router.php  
  - **Acción a realizar:** Revisar el mecanismo de enrutamiento para asegurarse de que es fácil extenderlo y mantenerlo, agregando nuevos endpoints de ser necesario y documentando la estructura de rutas.  
  - **Justificación detallada:** Un enrutador centralizado y flexible es clave para soportar futuras optimizaciones y el desacoplamiento del frontend, asegurando que cada recurso tenga una ruta bien definida.  
  - **Archivos de referencia:** Los endpoints actuales como dashboard.php, error_config.php
  
---

## 4. Centralizar la Lógica de Navegación y Parámetros

**Título:**  
Migrar la gestión de parámetros de navegación (por ejemplo, ‘periodo’ y ‘conta’) a un servicio compartido que exponga esta información mediante API.

**Dependencias:**  
- NavigationInterface, Navigation  
- Vistas que dependen de estas variables (botonera.php, info_display.php)

**Subtareas:**

- **Título de la subtarea:** Refactorizar la clase Navigation  
  - **Archivos involucrados:**  
    - Navigation.php  
    - NavigationInterface.php  
  - **Acción a realizar:** Revisar y, de ser posible, centralizar la obtención de los parámetros de navegación, de manera que se pueda exponer esta lógica a través de un endpoint.  
  - **Justificación detallada:** Esto permitirá que tanto la capa de frontend como la de backend tengan una única fuente de verdad sobre el estado de navegación, reduciendo errores e inconsistencias.  
  - **Archivos de referencia:** DashboardController.php, botonera.php

- **Título de la subtarea:** Adaptar la vista/botonera para consumir parámetros vía API  
  - **Archivos involucrados:**  
    - botonera.php  
    - js (archivo a crear o actualizar para manejar la navegación)  
  - **Acción a realizar:** Remover la dependencia directa en las variables GET y utilizar el endpoint centralizado para obtener la configuración de navegación.  
  - **Justificación detallada:** Asegura la consistencia en la lógica de navegación, especialmente en un contexto en el que el frontend se desacopla del backend.  
  - **Archivos de referencia:** Navigation.php, DashboardController.php

---

## 5. Revisar y Documentar la Integración de CSRF en el Desacoplamiento

**Título:**  
Asegurarse de que la protección CSRF se integre correctamente en la transición hacia un frontend desacoplado.

**Dependencias:**  
- CsrfHelper, Views que utilizan formularios (botonera.php)

**Subtareas:**

- **Título de la subtarea:** Revisar la generación y validación de tokens CSRF  
  - **Archivos involucrados:**  
    - CsrfHelper.php  
  - **Acción a realizar:** Verificar que la integración de CSRF se mantiene tanto en la versión actual como en la futura versión del frontend; considerar documentar cómo se pasarán estos tokens a través de la API y su posterior utilización en formularios o peticiones AJAX.  
  - **Justificación detallada:** Mantener la seguridad de la aplicación es crítico mientras se efectúan cambios en la forma de consumir y enviar datos, sin que la protección CSRF resulte comprometida.  
  - **Archivos de referencia:** botonera.php, CsrfHelper.php