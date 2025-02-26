# Plan de Mejoras Priorizadas para el Proyecto DataMaq

## 1️⃣ Implementar Mecanismo Seguro de Manipulación del DOM
**Dependencias:** Ninguna

### Subtareas:
#### 1.1 Crear utilidad de sanitización de HTML
- **Archivos involucrados:** `/frontend/js/utils/DomUtils.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** El uso de `innerHTML` sin sanitización en UiService.js crea vulnerabilidades XSS. Una utilidad centralizada permite implementar una protección consistente.
- **Archivos de referencia:** UiService.js (línea 84: `container.innerHTML = infoDisplayHtml`)

#### 1.2 Implementar funciones de creación segura de elementos
- **Archivos involucrados:** `/frontend/js/utils/DomUtils.js`
- **Acción:** Modificar
- **Justificación:** Proporcionar alternativas seguras a `innerHTML` mediante métodos que creen elementos DOM de forma controlada.
- **Archivos de referencia:** UiService.js (método `generateInfoDisplayHtml`)

#### 1.3 Actualizar UiService para usar métodos seguros
- **Archivos involucrados:** UiService.js
- **Acción:** Modificar
- **Justificación:** Reemplazar todas las instancias de `innerHTML` con los nuevos métodos seguros de manipulación del DOM.
- **Archivos de referencia:** `DomUtils.js`

## 2️⃣ Implementar Sistema Centralizado de Estado
**Dependencias:** Parcialmente dependiente de la tarea 1

### Subtareas:
#### 2.1 Completar implementación de AppState
- **Archivos involucrados:** AppState.js
- **Acción:** Modificar
- **Justificación:** Ya existe una implementación parcial en ApiService.js que hace referencia a este archivo. Debe expandirse para gestionar todo el estado de la aplicación.
- **Archivos de referencia:** ApiService.js (línea 1: `import appState from '../state/AppState.js'`)

#### 2.2 Migrar datos desde window.chartData
- **Archivos involucrados:** main.js, ChartController.js
- **Acción:** Modificar
- **Justificación:** Eliminar el uso de `window.chartData` como variable global para almacenar datos críticos, mejorando la seguridad y mantenibilidad.
- **Archivos de referencia:** main.js (líneas 108-114), ChartController.js

#### 2.3 Implementar patrón observador para notificaciones
- **Archivos involucrados:** AppState.js
- **Acción:** Modificar
- **Justificación:** Reemplazar los eventos personalizados del DOM con un sistema de suscripción para notificar cambios de estado.
- **Archivos de referencia:** main.js (línea 132-145: CustomEvent 'chartDataReady')

#### 2.4 Actualizar DoubleClickHandler para usar AppState
- **Archivos involucrados:** DoubleClickHandler.js
- **Acción:** Modificar
- **Justificación:** Actualmente accede directamente a `window.chartData`, necesita usar el sistema centralizado de estado.
- **Archivos de referencia:** DoubleClickHandler.js (línea 14-16: acceso a `window.chartData`)

## 3️⃣ Estandarizar Manejo de Operaciones Asíncronas
**Dependencias:** Ninguna

### Subtareas:
#### 3.1 Crear servicio centralizado para operaciones fetch
- **Archivos involucrados:** `/frontend/js/services/HttpService.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** Estandarizar todas las peticiones fetch con manejo consistente de errores, timeouts y cancelación.
- **Archivos de referencia:** ApiService.js (métodos fetch)

#### 3.2 Implementar manejador global de errores
- **Archivos involucrados:** `/frontend/js/utils/ErrorHandler.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** Centralizar el manejo de errores para garantizar un tratamiento consistente en toda la aplicación.
- **Archivos de referencia:** ApiService.js, ChartController.js (múltiples bloques try-catch)

#### 3.3 Actualizar ApiService para usar HttpService
- **Archivos involucrados:** ApiService.js
- **Acción:** Modificar
- **Justificación:** Delegar las peticiones HTTP al servicio centralizado para mejorar la consistencia y mantenibilidad.
- **Archivos de referencia:** `HttpService.js`

## 4️⃣ Refactorizar ChartController para Responsabilidad Única
**Dependencias:** Tarea 2 (Sistema de Estado)

### Subtareas:
#### 4.1 Extraer lógica de inicialización
- **Archivos involucrados:** `/frontend/js/modules/chart/ChartInitializer.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** ChartController.js tiene ~300 líneas con múltiples responsabilidades, violando el principio de responsabilidad única.
- **Archivos de referencia:** ChartController.js (métodos de inicialización)

#### 4.2 Extraer lógica de manejo de eventos
- **Archivos involucrados:** `/frontend/js/modules/chart/ChartEventHandler.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** Separar el manejo de eventos para cumplir con el principio de responsabilidad única.
- **Archivos de referencia:** ChartController.js (métodos de eventos)

#### 4.3 Extraer lógica de renderizado
- **Archivos involucrados:** `/frontend/js/modules/chart/ChartRenderer.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** Separar el renderizado para cumplir con el principio de responsabilidad única.
- **Archivos de referencia:** ChartController.js (método createChart)

#### 4.4 Simplificar ChartController
- **Archivos involucrados:** ChartController.js
- **Acción:** Modificar
- **Justificación:** Convertir ChartController en una fachada que coordine las nuevas clases específicas.
- **Archivos de referencia:** `ChartInitializer.js`, `ChartEventHandler.js`, `ChartRenderer.js`

## 5️⃣ Implementar Inyección de Dependencias Simple
**Dependencias:** Tarea 4 (Refactorización de ChartController)

### Subtareas:
#### 5.1 Modificar constructores para recibir dependencias
- **Archivos involucrados:** ChartController.js
- **Acción:** Modificar
- **Justificación:** Eliminar instanciaciones directas dentro de clases para reducir acoplamiento.
- **Archivos de referencia:** ChartController.js (líneas 14-30: inicialización de `validator` y `seriesBuilder`)

#### 5.2 Crear servicio de fábrica
- **Archivos involucrados:** `/frontend/js/services/ServiceFactory.js` (crear)
- **Acción:** Crear archivo
- **Justificación:** Centralizar la creación de instancias para facilitar la inyección de dependencias.
- **Archivos de referencia:** main.js

#### 5.3 Actualizar inicialización en main.js
- **Archivos involucrados:** main.js
- **Acción:** Modificar
- **Justificación:** Inicializar la aplicación usando el patrón de inyección de dependencias.
- **Archivos de referencia:** `ServiceFactory.js`

## 6️⃣ Implementar Patrón de Plugin para SeriesBuilder
**Dependencias:** Tarea 5 (Inyección de Dependencias)

### Subtareas:
#### 6.1 Refactorizar SeriesBuilder para extensibilidad
- **Archivos involucrados:** SeriesBuilder.js
- **Acción:** Modificar
- **Justificación:** Actualmente para añadir un nuevo tipo de serie hay que modificar múltiples métodos. Implementar un sistema de plugins mejoraría la extensibilidad.
- **Archivos de referencia:** SeriesBuilder.js (método `buildSeries`)

#### 6.2 Extraer definiciones de series a archivos separados
- **Archivos involucrados:** `/frontend/js/modules/chart/series/` (crear carpeta y archivos)
- **Acción:** Crear archivos
- **Justificación:** Cada tipo de serie debería estar en un archivo separado para facilitar extensión sin modificar el código original.
- **Archivos de referencia:** SeriesBuilder.js (métodos `buildInductiveSensorSeries`, `buildOpticalSensorSeries`, etc.)

## 7️⃣ Reorganizar Estructura de Carpetas
**Dependencias:** Tarea 4, 5 y 6 parcialmente completadas

### Subtareas:
#### 7.1 Crear estructura de carpetas organizada
- **Archivos involucrados:** Estructura general del proyecto
- **Acción:** Crear carpetas
- **Justificación:** Mejorar la organización para facilitar el mantenimiento y la escalabilidad.
- **Archivos de referencia:** Todo el proyecto

#### 7.2 Mover archivos a ubicaciones apropiadas
- **Archivos involucrados:** Múltiples archivos
- **Acción:** Mover y actualizar imports
- **Justificación:** Mejorar la coherencia estructural entre archivos relacionados.
- **Archivos de referencia:** Todo el proyecto

## 8️⃣ Extraer y Organizar Estilos CSS
**Dependencias:** Ninguna

### Subtareas:
#### 8.1 Crear estructura de carpetas CSS
- **Archivos involucrados:** css (crear carpetas)
- **Acción:** Crear carpetas
- **Justificación:** Los estilos están actualmente embebidos en main.html y necesitan ser organizados.
- **Archivos de referencia:** main.html (estilos en línea)

#### 8.2 Extraer estilos de main.html
- **Archivos involucrados:** `/frontend/css/main.css`, main.html
- **Acción:** Crear y modificar
- **Justificación:** Separar la presentación de la estructura para mejor mantenimiento.
- **Archivos de referencia:** main.html (líneas 13-62: estilos CSS)

#### 8.3 Implementar metodología BEM
- **Archivos involucrados:** `/frontend/css/components/*.css`
- **Acción:** Crear
- **Justificación:** Mejorar la nomenclatura de clases para evitar conflictos y aumentar mantenibilidad.
- **Archivos de referencia:** main.html (líneas 13-62: clases CSS genéricas como `.c1`, `.graf`)

## 🔥 Decisión Final
La implementación debería seguir este orden ya que:

1. Las mejoras de seguridad (manipulación del DOM) son prioritarias y no tienen dependencias.
2. El sistema de gestión de estado centralizado es fundamental y requiere cambios mínimos para funcionar.
3. Las mejoras en operaciones asíncronas proporcionarán mayor robustez inmediata.
4. La refactorización de componentes para responsabilidad única mejorará la mantenibilidad sin cambios estructurales profundos.
5. Las mejoras de arquitectura (inyección de dependencias, patrones de diseño) pueden implementarse después de tener una base más sólida.
6. Los cambios estructurales son menos prioritarios y pueden implementarse gradualmente.