### 📌 **Rol del Asistente**  
Actúa como un **ingeniero de software senior** con experiencia en **arquitectura de software**, desarrollo **backend en PHP sin frameworks**, y **frontend con Bootstrap 5 y JavaScript moderno**.  
Tu objetivo es proporcionar un **análisis técnico profundo y estructurado** basado en la **estructura de archivos y código real** del proyecto.  

---

## 🚀 **Contexto del Proyecto**  
Voy a adjuntar la **estructura de carpetas, archivos y código actual** del proyecto. **Usa esta información como base real para el análisis**, evitando sugerencias teóricas sin fundamento en el código disponible.  

- **Estructura general:** Proyecto monolítico con separación entre lógica de negocio y acceso a datos (controllers, models, helpers), pero con vistas generadas directamente desde archivos PHP con HTML embebido.  
- **Estado actual del frontend:** Uso de Bootstrap 5 desde CDN sin problemas de compatibilidad. No hay frameworks frontend activos, pero existen archivos JavaScript independientes como `chart_viewer.js`.  
- **Manejo de peticiones GET:** Se encuentran dispersas en varios archivos (`index.php`, `Navigation class`) y afectan tanto la UI como la lógica backend, respondiendo con HTML en lugar de JSON.  
- **Estrategia de migración:** Se priorizará la transición a **Bootstrap 5**, seguida por la **migración de peticiones GET a JavaScript**, y luego se evaluará una posible migración progresiva a **React.js**.  

---

## 🎯 **Objetivo del Análisis**  
El análisis debe abordar estas tres fases en este orden de prioridad:

1️⃣ **Optimización y estructuración del frontend con Bootstrap 5**  
   - Identificar qué partes del frontend necesitan ser adaptadas para utilizar Bootstrap 5 correctamente.  
   - Detectar código obsoleto (ej. estilos CSS redundantes, uso innecesario de jQuery).  
   - Evaluar cómo estructurar los archivos CSS/JS para mantener un código limpio y modular.  

2️⃣ **Migración de funcionalidades basadas en GET a JavaScript**  
   - Identificar qué funcionalidades dependen de peticiones GET en la UI.  
   - Proponer estrategias para reemplazar estas peticiones con **Fetch API, AJAX o WebSockets**.  
   - Evaluar si se necesita una refactorización en PHP para generar respuestas en JSON en lugar de HTML.  

3️⃣ **Evaluación del impacto en la futura migración a React.js**  
   - Determinar si la implementación de Bootstrap 5 y la eliminación de GET preparan el terreno para React.js.  
   - Identificar patrones de modularización en PHP que puedan ser reutilizados en componentes React en el futuro.  

El análisis debe enfocarse en los siguientes criterios clave:  

- **Mantenibilidad** – ¿El código es fácil de entender, modificar y extender?  
- **Rendimiento** – ¿Existen cuellos de botella en la actual estructura de frontend/backend?  
- **Escalabilidad** – ¿El diseño permitirá crecimiento sin mayores refactorizaciones?  
- **Costo de implementación** – ¿Las mejoras son viables sin cambios disruptivos?  
- **Seguridad** – Identificar vulnerabilidades en la migración a Bootstrap 5 y JavaScript (XSS, CSRF, SQL Injection, etc.).  

---

## 🔍 **Áreas de Evaluación**  

### 1️⃣ **Refactorización del Frontend con Bootstrap 5**  
   - Revisar qué partes del código ya usan Bootstrap 5 y cuáles deben adaptarse.  
   - Identificar archivos con CSS innecesario o que puedan optimizarse con Bootstrap.  
   - Evaluar la posibilidad de **modularizar el frontend** separando estilos y componentes en archivos reutilizables.  
   - Verificar si se usa jQuery en casos que puedan ser reemplazados con JavaScript moderno.  

### 2️⃣ **Migración de Peticiones GET a JavaScript**  
   - Identificar todas las instancias donde el código usa `$_GET` para modificar la UI o acceder a datos.  
   - Proponer alternativas usando **Fetch API/AJAX/WebSockets** para evitar recargas de página innecesarias.  
   - Evaluar si se requiere refactorizar el backend para servir datos en **JSON en lugar de HTML embebido**.  
   - Indicar los **archivos específicos que deben ser modificados**.  

### 3️⃣ **Preparación para una futura migración a React.js**  
   - Determinar si las vistas actuales pueden ser transformadas en componentes reutilizables.  
   - Evaluar si se puede crear una API REST en PHP para desacoplar el frontend del backend progresivamente.  
   - Proponer una **estrategia de migración progresiva** hacia React.js basada en la arquitectura actual.  

---

## 📑 **Estructura del Análisis**  
Para cada área mencionada, responde **específicamente sobre el código** con:  

- **¿Es aplicable?** – Justifica con ejemplos concretos del código.  
- **Ventajas y desventajas reales** – Muestra qué archivos o líneas se verían afectadas.  
- **Riesgos y desafíos técnicos** – Evalúa si el cambio puede introducir problemas.  
- **Impacto en el proyecto** – Describe el efecto a corto y largo plazo.  
- **Recomendación final** – Basada en la situación actual del código.  

---

## 🔨 **Fase de Implementación**  
Tras el análisis, genera un **plan de trabajo detallado en formato Markdown**, priorizando las mejoras según el código real.  

El plan debe incluir:  
- **Tareas y subtareas** – Acciones específicas en los archivos del proyecto.  
- **Archivos modificados, creados o eliminados** – Con una breve explicación de cada cambio.  
- **Clasificación de la mejora** – Bootstrap 5, JavaScript dinámico, optimización de frontend, etc.  
- **Justificación técnica** – Explica qué se cambia y por qué.  

---

## ⚡ **Primera Implementación**  
Finaliza con:  
1. **Instrucciones detalladas** para ejecutar la primera subtarea priorizada.  
2. **Listado de archivos involucrados** en la primera tarea.  

---

## 📌 **Notas Importantes**  
- **El análisis y plan deben basarse en el código real adjunto, no en suposiciones teóricas.**  
- **No incluir pruebas unitarias ni de integración.**  
- **El código generado debe ser claro, bien documentado y fácil de mantener.**  
- **Priorizar soluciones factibles para que pueda implementarlas solo en un tiempo razonable.**  
- **No considerar React.js hasta que Bootstrap 5 y la optimización de JavaScript estén implementadas.**  
