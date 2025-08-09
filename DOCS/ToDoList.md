# Listado de Tareas para Desacoplamiento y Migración a Vue.js

## 1. **Eliminar Dependencias Globales y Centralizar Estado**
- **1.1. Eliminar uso de `window.chartData` y `window.initialData`**
    - Refactorizar todos los módulos para consumir el estado desde `AppState`.
    - Migrar inicialización y actualización de datos a través de `AppState`.
- **1.2. Unificar la gestión de estado en `AppState`**
    - Eliminar duplicidad entre main.js, app.js y otros.
    - Adaptar todos los servicios y controladores para usar solo `AppState`.

---

## 2. **Desacoplar Lógica de Presentación y Renderizado**
- **2.1. Extraer generación de HTML de `UiService` a templates independientes**
    - Convertir funciones como `generateInfoDisplayHtml` y `generateBotoneraHtml` en componentes Vue SFC.
    - Crear archivos `.vue` para cada bloque de UI.
- **2.2. Eliminar manipulación directa del DOM**
    - Reemplazar `document.getElementById`, `innerHTML`, y listeners por bindings reactivos.
    - Adaptar event listeners de la botonera a métodos Vue.

---

## 3. **Refactorizar Controladores y Servicios**
- **3.1. Descomponer ChartController.js en componentes y servicios**
    - Separar lógica de inicialización, renderizado y eventos en módulos independientes.
    - Crear un componente Vue para el gráfico.
- **3.2. Adaptar DoubleClickHandler.js para emitir eventos Vue**
    - Reemplazar lógica de doble click por métodos y emits de Vue.

---

## 4. **Componentizar Bloques Reutilizables**
- **4.1. Identificar y migrar bloques repetidos (botonera, info, gráficos)**
    - Crear componentes Vue para cada bloque.
    - Usar props y emits para comunicación entre componentes.
- **4.2. Consolidar utilidades y lógica repetida**
    - Unificar funciones en `utils/` y eliminar duplicados.

---

## 5. **Encapsular Servicios de API**
- **5.1. Refactorizar `ApiService` para desacoplar de la UI**
    - Eliminar referencias a `window.*` y dependencias directas del DOM.
    - Usar solo el estado centralizado y devolver datos puros.

---

## 6. **Simplificar Inicialización y Ciclo de Vida**
- **6.1. Consolidar punto de entrada único**
    - Unificar la lógica de main.js y app.js en un solo archivo compatible con Vue.
    - Eliminar inicialización redundante y listeners globales.
- **6.2. Migrar eventos customizados a sistema de props/emits**
    - Reemplazar `CustomEvent` por comunicación Vue.

---

## 7. **Preparar Migración de Templates y Estilos**
- **7.1. Migrar index.html y templates a estructura Vue**
    - Convertir la estructura principal en `App.vue`.
    - Adaptar header.html y otros templates a componentes Vue.
- **7.2. Adaptar estilos CSS para componentes Vue**
    - Modularizar estilos y eliminar dependencias globales.

---

## 8. **Mejorar Testeo y Cobertura**
- **8.1. Crear tests unitarios para lógica JS**
    - Tests para servicios, utilidades y validadores.
- **8.2. Mockear llamadas a API y eventos**
    - Asegurar cobertura ≥ 80%.

---

## 9. **Documentar y Validar Refactorización**
- **9.1. Documentar cambios y nuevas estructuras**
    - Actualizar README y guías de migración.
- **9.2. Validar migrabilidad y compatibilidad**
    - Probar cada componente y servicio en entorno Vue.
