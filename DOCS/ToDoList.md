## 1. Mejora: Refactorización Modular de Frontend (ChartViewer JS)

### Dependencias:
- Inyección actual de datos en index.php (window.chartData).  
- Uso de Highcharts y la estructura IIFE en el archivo que se convertirá en ChartController.js.

### Subtareas:

#### 1.1. Encapsular la lógica en clases y separar responsabilidades  
- **Título de la subtarea:**  
  "Reorganización de ChartController: Modularización y separación de métodos"

- **Archivos involucrados:**  
  - ChartController.js (archivo resultante de la reubicación y renombrado)

- **Acción a realizar:**  
  - **Paso 1:** Auditar el archivo actual para identificar la lógica de inicialización, manejo de eventos (como doble clic) y renderizado del gráfico.  
  - **Paso 2:** Dividir el código en métodos independientes dentro de una clase, definiendo claramente métodos como:  
    - `initialize()` para configurar el entorno y cargar datos iniciales.  
    - `attachEventListeners()` para registrar eventos (sin modificar la funcionalidad actual).  
    - `renderChart()` para encapsular la invocación a Highcharts y la presentación del gráfico.  
  - **Paso 3:** Insertar comentarios que documenten la responsabilidad de cada método, haciendo hincapié en la separación de concerns.  
  - **Paso 4:** Preparar pruebas manuales de cada método de forma incremental (por ejemplo, invocar primero initialize y luego adjuntar eventos) para asegurar que la funcionalidad no se rompe durante el proceso de refactorización.

- **Justificación detallada:**  
  Al separar cada responsabilidad en métodos claros se aplica el principio de Responsabilidad Única de SOLID. Esto facilita la introducción de mejoras futuras (como la migración a Fetch API y eventualmente a Vue.js) sin afectar el comportamiento actual de la aplicación. Además, la modularización en una clase permite aislar la lógica del gráfico y reducir el impacto en producción mediante pruebas incrementales.

- **Archivos de referencia:**  
  - Código actual del IIFE en ChartController.js  
  - Buenas prácticas de modularización y principios SOLID en JavaScript moderno

#### 1.2. Documentar y preparar la transición a Fetch API  
- **Título de la subtarea:**  
  "Incorporar comentarios y puntos de extensión para migración a consumo API"

- **Archivos involucrados:**  
  - ChartController.js  
  - index.php (especialmente donde se inyecta window.chartData)

- **Acción a realizar:**  
  - Comentar en el módulo creado los puntos exactos donde se espera reemplazar la inyección de datos global (window.chartData) por una llamada activa a un endpoint API usando Fetch.  
  - Marcar secciones del código para que en una fase posterior se reemplace el método de adquisición de datos, sin eliminar la funcionalidad actual.

- **Justificación detallada:**  
  Incluir puntos de extensión y documentación facilita la migración gradual sin la necesidad de revertir cambios masivos en producción. Los comentarios claros permiten a futuros desarrolladores identificar rápidamente dónde intervenir sin afectar la lógica existente.

- **Archivos de referencia:**  
  - Código actual y comentarios en index.php y ChartController.js

---

## 2. Mejora: Desacoplar la Inyección de Datos del Backend al Frontend

### Dependencias:
- El método actual de inyección directa de `window.chartData` en index.php.  
- Endpoints API disponibles y el trabajo en DashboardController.

### Subtareas:

#### 2.1. Identificar puntos de inyección y documentar la dependencia  
- **Título de la subtarea:**  
  "Análisis y documentación de la integración de datos en index.php"

- **Archivos involucrados:**  
  - index.php  
  - DashboardController.php

- **Acción a realizar:**  
  - Localizar y documentar dónde y cómo se inyecta la variable global `window.chartData`.  
  - Crear un documento interno o comentarios en código que describan cómo se relaciona esta inyección con la lógica del backend.

- **Justificación detallada:**  
  Conocer la dependencia actual es clave para planificar una migración sin afectar la funcionalidad. Este análisis permite coordinar esfuerzos entre modificaciones en el backend y la actualización del frontend.

- **Archivos de referencia:**  
  - DashboardController.php, index.php, dashboard_test.php

#### 2.2. Crear un endpoint API robusto para exposición de datos (fase de transición)  
- **Título de la subtarea:**  
  "Fortalecer y documentar el endpoint API de datos para Dashboard"

- **Archivos involucrados:**  
  - dashboard.php  
  - dashboard_test.php

- **Acción a realizar:**  
  - Revisar y reforzar la validación de parámetros y seguridad en el endpoint.  
  - Documentar el funcionamiento y los parámetros esperados en dichos endpoints.

- **Justificación detallada:**  
  Un endpoint sólido y bien documentado servirá de base para reemplazar la inyección de datos, haciendo la transición a una arquitectura desacoplada sin afectar la estabilidad actual.

- **Archivos de referencia:**  
  - dashboard.php, dashboard_test.php

#### 2.3. Planificar la migración gradual del consumo en el frontend  
- **Título de la subtarea:**  
  "Plan de migración para reemplazar window.chartData por llamadas Fetch"

- **Archivos involucrados:**  
  - ChartController.js  
  - index.php

- **Acción a realizar:**  
  - Incluir en el módulo de ChartController un esquema documentado que permita la futura conversión a Fetch, sin eliminar la solución actual.  
  - Coordinar pruebas para la transición y asegurarse que, una vez migrado, se desactive la inyección directa en index.php.

- **Justificación detallada:**  
  Permitir una migración incremental evita interrupciones en producción. Se garantiza que cada cambio se pueda probar de manera aislada y revertir en caso de incidencias.

- **Archivos de referencia:**  
  - dashboard_test.php, index.php

---

## 3. Mejora: Reorganización y Documentación de la Estructura de Archivos y Dependencias

### Dependencias:
- Ubicaciones actuales de vistas, controladores y configuraciones en el proyecto.  
- La dispersión de recursos frontend (plantillas, scripts, imágenes).

### Subtareas:

#### 3.1. Reorganizar la carpeta de Frontend para aislar recursos (HTML, JS, CSS)  
- **Título de la subtarea:**  
  "Estructuración de recursos frontend en carpetas específicas"

- **Archivos involucrados:**  
  - Plantillas en templates  
  - Scripts en js  
  - Imágenes en img

- **Acción a realizar:**  
  - Revisar y reubicar recursos según su tipo para mejorar la mantenibilidad.  
  - Documentar la nueva estructura y comunicarla al equipo.

- **Justificación detallada:**  
  Una estructura organizada permite una migración gradual y facilita la separación de responsabilidades entre backend y frontend.

- **Archivos de referencia:**  
  - header.html, info_display.html, botonera.html, index.html

#### 3.2. Documentar las interfaces y dependencias entre backend y frontend  
- **Título de la subtarea:**  
  "Creación de documentación interna de interfaces y dependencias"

- **Archivos involucrados:**  
  - index.php, DashboardController.php  
  - Archivos de vista como header.php, info_display.php

- **Acción a realizar:**  
  - Elaborar un documento o comentarios en código que detallen la relación entre cada capa (controladores, servicios, vistas y scripts JS).

- **Justificación detallada:**  
  Esta documentación facilitará la incorporación de nuevos desarrolladores y sentará las bases para una futura migración a frameworks modernos.

- **Archivos de referencia:**  
  - Todas las ubicaciones del backend y frontend que intervienen en la renderización y provisión de datos.