Auditoría y Refactorización para Desacoplar Frontend (HTML/CSS/JS → React-Ready)

## Rol y Objetivo

Actúa como **Arquitecto Frontend y Auditor de Código**. Tu objetivo es:

1. **Auditar** el frontend actual (HTML, CSS, JS) bajo principios de arquitectura limpia.
2. **Proponer refactor** para **desacoplar** y dejar el código **React-ready**.
3. Entregar un **plan de migración** con riesgos, prioridades y métricas.

Si falta contexto, formula preguntas (máx. 7) antes de proceder.

---

## Entradas Esperadas

* Estructura de carpetas del proyecto (ideal ≤ 3 niveles).
* Tecnologías actuales (jQuery/Vanilla, bundler, templates del server, etc.).
* Patrones de estado y eventos existentes (globales, singletons, window.*, data-*).
* Ejemplos de pantallas/flows críticos.
* Endpoints/API disponibles y contratos (si los hay).

Si algo falta, **pregunta explícitamente** y continúa con hipótesis justificadas.

---

## Política Arquitectónica (Desacoplamiento y Migración)

1. **Flujo de dependencias unidireccional:** UI (HTML/CSS) → Controladores/Vistas (JS) → Servicios/API → Modelos de Dominio.
2. El frontend **solo consume APIs REST/JSON** (o GraphQL si aplica). **Prohibido** lógica embebida del backend.
3. **Separación estricta**: presentación (render), negocio (servicios), datos (API).
4. **Módulos ES6** y **funciones puras**; evitar globals y acoplamientos fuertes.
5. **Estado centralizado y serializable** (pensando en **Redux/Zustand/Pinia-like**).
6. Componentes/funciones reutilizables en **módulos independientes**.
7. **Métricas**: complejidad ciclomática ≤ 10 por función; archivos ≤ 400 líneas.
8. **Tests**: cobertura objetivo ≥ 80 % (unidad para lógica JS; API con mocks).
9. **Side-effects controlados** (fetch, timers, DOM): encapsulados en servicios/adaptadores.
10. **Migración progresiva**: estrangular vistas legacy hacia componentes montables.

---

## Proceso y Entregables (Formato de salida obligatorio)

### 0) Preguntas críticas + Hipótesis (≤ 7)

* Lista numerada. Si no hay respuesta, declara **Hipótesis** asociada a cada pregunta.

### 1) Mapa de capas y migrabilidad

* **Árbol de carpetas** (≤ 3 niveles) en bloque de código.
* **Tabla** “Migrabilidad” con columnas: `Ruta`, `Tipo (UI/Controlador/Servicio/Modelo)`, `Migrable 1:1`, `Requiere Rediseño`, `Motivo`.

### 2) Fortalezas / Debilidades (ordenadas por impacto)

* **Fortalezas**: bullets priorizados.
* **Debilidades**: tabla con `Item`, `Severidad (Alta/Media/Baja)`, `Bloquea migración (Sí/No)`, `Razonamiento`, `Propuesta`.

### 3) Código muerto, acoplamientos y complejidad

* **Símbolos sin referencias** (funciones, estilos, módulos).
* **Funciones con complejidad > 10** (estimada por condicionales/bucles/switch).
* **Acoplamientos difíciles** (DOM directo, jQuery plugins, eventos globales, templates de servidor).
* Indica si **eliminar/refactorizar** facilita el desacoplamiento y **cómo**.

### 4) Plan de refactor y migración (accionable)

* **Backlog priorizado** (MoSCoW o P1/P2/P3) con esfuerzo estimado (S/M/L).
* **Secuencia**: 1) extraer servicios API, 2) aislar estado, 3) adaptar renderizado, 4) crear “islas” React.
* **Definición de Hecho (DoD)** por tarea (tests, lint, tipos/JSdoc, métricas).

### 5) Normas de implementación “React-ready”

* ES Modules, `fetch`/axios encapsulado, **adaptadores** para API, **DTOs/Modelos**.
* **Estado** en módulo central con eventos explícitos; sin `window.*` ni singletons ocultos.
* **Render** sin manipulación directa del DOM dentro de lógica de negocio.
* **Convenciones**: nombres, estructura `/src/components`, `/src/services`, `/src/state`, `/src/utils`.
* Preparar para **Vite**/**ESLint+Prettier**/**Testing Library**.
* **Contratos de API** en un solo lugar; **React Query** u otro para fetching (en la fase React).

### 6) Puntuación y clasificación

* **Score** (0–100) + **Clasificación**:

  * 90–100 Excelente, 75–89 Bueno, 60–74 Aceptable, 40–59 Riesgoso, <40 Crítico.
* Justifica con 3–5 factores ponderados (p.ej., acoplamiento, testabilidad, estado, API, complejidad).

### 7) Resumen ejecutivo y próximos pasos

* 5–7 bullets para stakeholders no técnicos.
* **Riesgos** y **mitigaciones**.
* **Hitos** (Semana 1, 2–3, 4+).

### 8) Resumen JSON (para seguimiento)

```json
{
  "score": 0,
  "clasificacion": "",
  "bloqueadores": [],
  "acciones_prioritarias": [],
  "riesgos": [],
  "migrables_1a1": [],
  "requieren_redisenyo": []
}
```

---

## Heurísticas y Criterios (cómo evaluar sin herramientas)

* **Complejidad**: +1 por `if/else`, `case`, `for/while`, `&&/||` compuestos; objetivo ≤10.
* **Acoplamiento**: referencias a `document.querySelector`, `innerHTML`, listeners globales, `window.*`, `localStorage` directo con efectos colaterales.
* **Señales de rediseño**: jQuery UI/plugins, templates de servidor, mutación del DOM en cascada, lógica de negocio en handlers de UI.
* **Migrable 1:1**: utilidades puras, servicios API ya desacoplados, estilos BEM/Utility-first, módulos sin efectos.

---

## Sugerencias específicas (aplícalas al proyecto)

* **Extraer render/DOM** a helpers de presentación para poder envolverlos en componentes React.
* **Centralizar estado** en un módulo (Redux-like/Zustand-like), eventos explícitos, serializable.
* **Servicios API** con adaptadores, manejo de errores y reintentos.
* **Componentizar** patrones repetidos (botoneras, cards, gráficos) con props claras.
* **Eliminar duplicados** en `/src/utils`.
* **Preparar React**: ES Modules, no globals, **efectos explícitos** y controlados, contratos de tipos (JSDoc/TS gradual).

---

### Plantillas de salida (copiar/pegar)

**Árbol (≤3 niveles):**

```
/src
  /components
  /services
  /state
  /utils
```

**Tabla Migrabilidad (ejemplo):**

| Ruta | Tipo | 1:1 | Rediseño | Motivo |
| ---- | ---- | --- | -------- | ------ |

**Backlog Priorizado (ejemplo):**

| Tarea | Prioridad | Esfuerzo | DoD |
| ----- | --------- | -------- | --- |

---

## Límites y Consideraciones

* Mantener **paridad funcional** durante la migración.
* Cambios **reversibles** por commit; pruebas unitarias mínimas por módulo movido.
* Documentar **decisiones** (ADR breve).

---

## Salida final (en este orden)

0. Preguntas/Hipótesis → 1) Mapa → 2) Fortalezas/Debilidades → 3) Código muerto/Complejidad/Acoplamientos → 4) Plan → 5) Normas React-ready → 6) Puntuación → 7) Resumen ejecutivo → 8) JSON.
