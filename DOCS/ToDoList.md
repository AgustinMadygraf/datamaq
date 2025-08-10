## Informe de Situación: Auditoría y Refactorización Frontend (HTML/CSS/JS → React-ready)

### Resumen Ejecutivo

El sistema actual presenta una arquitectura modular avanzada para un proyecto legacy, con servicios, estado centralizado y utilidades desacopladas. Sin embargo, persisten acoplamientos directos al DOM, generación de HTML como string, eventos globales y dependencias a plantillas legacy. Estos factores dificultan la migración progresiva a React y limitan la mantenibilidad y escalabilidad.

#### Fortalezas
- **Modularidad:** Uso de ES6 modules, separación de servicios (`ApiService`, `UiService`), y utilidades (`SeriesBuilder`, `HighchartsConfig`).
- **Estado centralizado:** `AppState.js` implementa patrón observable, facilitando migración a Redux/Context.
- **Desacoplamiento parcial de eventos:** `ChartEventManager` y controladores gestionan eventos fuera de la UI.

#### Debilidades
- **Renderizado HTML como string:** `UiService.js` y otros servicios generan HTML en JS, dificultando la reutilización y testabilidad.
- **Manipulación directa del DOM:** Uso de `document.getElementById`, `innerHTML`, y listeners globales en varios módulos.
- **Eventos globales:** Comunicación entre módulos mediante eventos en `window` y `document`, lo que dificulta el control de flujo y la migración.
- **Dependencia de plantillas legacy:** Carga de HTML desde archivos externos y posible lógica embebida.
- **Código muerto y utilidades acopladas:** Archivos como `inject.js` y utilidades DOM que no siguen el patrón React.

#### Riesgos
- **Bloqueo de migración:** El acoplamiento al DOM y la generación de HTML como string bloquean la migración directa a React.
- **Complejidad oculta:** Funciones con lógica condicional y bucles anidados pueden superar la complejidad recomendada.
- **Eventos globales:** Pueden causar efectos secundarios inesperados y dificultan el debugging.

---

## Plan Detallado de Refactorización y Migración

### 1. Refactorizar Renderizado de UI

#### Tareas
1.1 [ ] **Extraer lógica de generación de HTML a funciones puras**
- Identificar todos los métodos que generan HTML (`generateInfoDisplayHtml`, `generateBotoneraHtml`).
- Refactorizar para que reciban datos y retornen solo estructuras de datos (objetos, arrays), no strings HTML.

1.2 [ ] **Crear componentes funcionales para info-display y botonera**
- Definir componentes JS (o JSX si se inicia React) que reciban props y rendericen la UI.
- Migrar la lógica de renderizado de cada sección a estos componentes.

1.3 **Eliminar manipulación directa del DOM en servicios**
- Modificar `UiService.js` para que no use `document.getElementById` ni `innerHTML`.
- Retornar datos a un controlador que gestione el renderizado (en React, sería el componente padre).

#### Subtareas
- Auditar todos los métodos de renderizado.
- Escribir tests unitarios para las nuevas funciones/componentes.
- Documentar la API de props esperada por cada componente.

---

### 2. Centralizar y Modernizar el Estado

#### Tareas
2.1 [ ] **Revisar y adaptar `AppState.js` para compatibilidad con Redux/Context**
- Mapear todas las claves y métodos del estado actual.
- Definir un shape de estado serializable y desacoplado de la UI.

2.2 [ ] **Eliminar acceso directo al estado desde módulos UI**
- Refactorizar para que los componentes reciban el estado por props/context, no por import directo.

2.3 [ ] **Implementar suscripción explícita a cambios de estado**
- Usar observadores/event bus o, en React, hooks personalizados para suscripción.

#### Subtareas
- Escribir tests de integración para flujos de actualización de estado.
- Documentar el contrato de estado y eventos.

---

### 3. Migrar Eventos Globales a Comunicación Local

#### Tareas
3.1 [ ] **Identificar todos los eventos globales (`window.*`, `document.*`)**
- Auditar el uso de `dispatchEvent`, `addEventListener`, y variables globales.

3.2 [ ] **Crear un event bus local o usar contextos**
- Implementar un módulo de eventos desacoplado (pub/sub).
- Refactorizar los listeners para que usen el event bus/context.

3.3 [ ] **Eliminar dependencias a eventos globales**
- Modificar controladores y servicios para que no dependan de eventos globales.

#### Subtareas
- Escribir tests unitarios para el event bus/context.
- Documentar los eventos y su flujo.

---

### 4. Encapsular Acceso a Highcharts

#### Tareas
4.1 [ ] **Crear un adaptador/hook para Highcharts**
- Encapsular la inicialización y configuración en una función/hook.
- Eliminar referencias a `window.Highcharts` fuera del adaptador.

4.2 [ ] **Migrar configuración y eventos a props/callbacks**
- Pasar la configuración y handlers como props/callbacks a los componentes.

#### Subtareas
- Escribir tests unitarios para el adaptador/hook.
- Documentar la API del adaptador.

---

### 5. Migrar Formularios y Botonera a AJAX/Componentes Controlados

#### Tareas
5.1 [ ] **Interceptar el submit de formularios y usar AJAX**
- Refactorizar la botonera para que use `ApiService` en vez de submit tradicional.

5.2 [ ] **Convertir la botonera en componente controlado**
- Definir el estado y los handlers en el componente padre.
- Pasar callbacks a los botones.

#### Subtareas
- Escribir tests de integración para la botonera.
- Documentar el flujo de datos y eventos.

---

### 6. Eliminar Código Muerto y Refactorizar Utilidades

#### Tareas
6.1 [ ] **Auditar y eliminar archivos no referenciados (`inject.js`, utilidades obsoletas)**
- Buscar referencias y eliminar código muerto.

6.2 [ ] **Refactorizar utilidades DOM para React**
- Convertir funciones como `waitForElement` en hooks (`useRef`, `useEffect`).

#### Subtareas
- Escribir tests unitarios para las nuevas utilidades/hooks.
- Documentar las utilidades y su uso.

---

### 7. Documentar Contratos de API y Tipos

#### Tareas
7.1 [ ] **Definir y documentar los contratos de datos esperados por la API**
- Crear archivos de tipos (JSDoc/TypeScript) para los datos recibidos y enviados.

7.2 [ ] **Validar datos en servicios y componentes**
- Usar validadores como `ChartDataValidator` para asegurar integridad.

#### Subtareas
- Escribir tests de validación.
- Documentar los contratos y ejemplos de datos.
