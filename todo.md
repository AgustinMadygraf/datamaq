### 2. Tarea Principal: Desacoplar el frontend del backend en la generación de vistas  
- **Título:** Separación de capas de presentación y lógica de negocio  
- **Dependencias:**  
  - Vistas PHP (info_display.php, header.php, botonera.php)  
  - Templates HTML del frontend  
  - Controlador DashboardController

  #### 🔹 Subtareas:
  - **Extraer la lógica de renderización de vistas en archivos template independientes**  
    - **Archivos involucrados:**  
      - Backend: info_display.php  
      - Frontend: info_display.html, header.html  
    - **Acción a realizar:**  
      - Modificar para que la capa de vistas se limite a la presentación, eliminando la inyección directa de variables en el HTML y delegando la obtención de datos a endpoints API o scripts independientes.  
    - **Justificación detallada:**  
      - Permite trabajar de forma paralela en cambios visuales sin impactar la lógica del backend, y facilita la transición futura a frameworks como Vue.js.  
    - **Archivos de referencia:**  
      - Ejemplos de renderización en ViewRenderer.php y la actual separación parcial en header.php.
  
  - **Revisar y reorganizar la inyección de datos a JavaScript**  
    - **Archivos involucrados:**  
      - Backend: index.php  
      - Frontend: chart_viewer.js
    - **Acción a realizar:**  
      - Modificar la forma en que se inyecta la variable global (window.chartData) para que se obtengan los datos a través de llamadas API en vez de incrustarlos directamente en el HTML.  
    - **Justificación detallada:**  
      - Reduce el acoplamiento entre backend y frontend, lo que permitirá mayor flexibilidad en la presentación de datos y simplifica la migración progresiva a un framework moderno.  
    - **Archivos de referencia:**  
      - Los endpoints actuales en dashboard.php y dashboard_test.php sirven de base para la transición a Fetch API.

---

### 3. Tarea Principal: Consolidar y mejorar la consistencia de los endpoints API del Dashboard  
- **Título:** Unificación y robustecimiento de endpoints para el Dashboard  
- **Dependencias:**  
  - Controlador DashboardController  
  - Endpoints en api (dashboard.php, dashboard_test.php)  
  - Servicios y modelos (DashboardService y DashboardModel)

  #### 🔹 Subtareas:
  - **Centralizar la extracción y saneamiento de parámetros de entrada**  
    - **Archivos involucrados:**  
      - Backend: dashboard.php  
      - Backend: dashboard_test.php
    - **Acción a realizar:**  
      - Modificar para asegurar que todos los parámetros de entrada se validen y saniticen de forma consistente antes de pasar al controlador.  
    - **Justificación detallada:**  
      - Incrementa la seguridad y reduce la posibilidad de errores de datos inesperados; mejora la integridad de la respuesta JSON.  
    - **Archivos de referencia:**  
      - Navigation.php y DashboardController.php para entender cómo se utilizan los parámetros luego.
  
  - **Asegurar que la respuesta del API sea consistente en formato JSON**  
    - **Archivos involucrados:**  
      - Backend: dashboard.php  
    - **Acción a realizar:**  
      - Ajustar el controlador para que, tanto en modo API como en modo vista, la salida cumpla con una estructura estándar, centralizando la gestión de errores.  
    - **Justificación detallada:**  
      - Facilita la integración con el frontend desacoplado y reduce la duplicidad en el manejo de errores.  
    - **Archivos de referencia:**  
      - DashboardController.php y dashboard_test.php sirven como ejemplo de manejo de errores en formato JSON.

---

### 4. Tarea Principal: Mejorar la gestión del menú y la plantilla del header  
- **Título:** Optimización de la plantilla del header y menú de navegación  
- **Dependencias:**  
  - Views del header (header.php y header.html)  
  - ViewRenderer

  #### 🔹 Subtareas:
  - **Reestructurar la generación del menú para que el frontend procese el JSON de elementos**  
    - **Archivos involucrados:**  
      - Backend: header.php o header.php  
      - Frontend: header.html
    - **Acción a realizar:**  
      - Modificar para que en lugar de iterar en PHP se pase un JSON o una estructura ya preparada para que el cliente (JavaScript) realice la iteración y renderización de los elementos.  
    - **Justificación detallada:**  
      - Permite mayor flexibilidad en actualizaciones del menú sin depender de la lógica del backend y alinea la práctica con futuras migraciones utilizando frameworks modernos.  
    - **Archivos de referencia:**  
      - El header actual y el método de renderización en ViewRenderer.php.
