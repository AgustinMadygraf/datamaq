

# GUÍA DE REFACTORIZACIÓN Y AUDITORÍA PARA MIGRACIÓN DE BACKEND PHP → FLASK (PYTHON)

## Objetivo
Guiar la refactorización y auditoría del sistema para facilitar la migración del backend de PHP a Flask (Python), asegurando el cumplimiento de principios de Arquitectura Limpia y la máxima desacoplación entre frontend y backend.

---

## POLÍTICA DE ARQUITECTURA PARA MIGRACIÓN

1. El flujo de dependencias será **unidireccional: UI/Infra → Interfaces (Blueprints) → Application (Services) → Domain (Models)**.
2. Las capas internas solo dependen de **abstracciones**; las concretas se inyectan (por ejemplo, usando dependencias en Flask).
3. **Sin dependencias** entre `domain` y librerías externas (Flask, SQLAlchemy, Marshmallow, etc.).
4. **Sin ciclos** detectables por `pydeps` o `import-linter` en el código Python.
5. **Complejidad ciclomática ≤ 10** por función; **longitud de archivo ≤ 400 líneas**.
6. Test coverage global **≥ 80 %**; los tests de unidad no acceden a red, disco ni DB reales (usar mocks/fixtures).
7. El frontend (plantillas, JS, CSS) debe consumir solo APIs REST/JSON, nunca lógica de backend embebida.

---

## INSTRUCCIONES DE REVISIÓN Y REFACTORIZACIÓN

0. **Preguntas Críticas + Hipótesis**
   - Formula hasta **7 preguntas** clave para la migración y cumplimiento de la política.
   - Para cada una: resume la **evidencia** (archivos/líneas) y una **hipótesis inicial**:  
     - ✅ Cumple, ⚠️ Parcial, ❌ Incumple, ❓ Sin evidencias.

1. **Mapa de Capas y Migrabilidad**
   - Muestra el **árbol de carpetas (≤ 3 niveles)**.
   - Asigna capa a cada nodo; marca 🚫 cuando mezcle responsabilidades o dificulte la migración.
   - Indica qué partes pueden migrarse 1:1 y cuáles requieren rediseño.

2. **Fortalezas / Debilidades para la Migración**
   - Listas separadas; ordena por **impacto en la migración** (↑).
   - Una línea, **≤ 15 palabras**, citando ruta y capa.
   - Para debilidades, añade **Severidad (Alta/Media/Baja)** y si bloquea la migración.

3. **Código Muerto, Acoplamientos y Complejidad**
   - Enumera símbolos sin referencias, funciones > 10 de complejidad, y acoplamientos PHP difíciles de portar.
   - Indica si su eliminación o refactorización facilita la migración.

4. **Deep-Dive en la Debilidad Crítica de Migración**
   - Explica la violación con referencias precisas.
   - Propón plan (≤ 5 pasos) para migrar o desacoplar — esfuerzo / riesgo.

5. **Verificación de Dependencias y Puntos de Acoplamiento**
   - Lista `require/include` o `import` donde una capa interna conoce otra externa o hay ciclos.
   - Sugiere inversión (puertos, DI, eventos) y cómo se mapearía en Flask (Blueprints, DI, etc.).

6. **Preocupaciones Transversales**
   - Revisa logging, transacciones, configuración, cache, eventos, seguridad & tracing.
   - Marca 🔄 si la lógica cruza capas; propone ubicación (decoradores, middlewares, blueprints).

7. **Calidad de Pruebas y Migrabilidad**
   - Indica cobertura (`pytest --cov`), relación de mocks por test, y tests acoplados a PHP/infraestructura.
   - Señala tests que deben reescribirse en Python y su alternativa.

8. **Documentación Técnica y Plan de Migración**
   - Verifica `/docs/architecture.md`, `/README.md`, `/ADR/`.
   - Marca ✅ actual, 🔄 desfasado, ❌ ausente; resume próximo paso para migrar documentación.

9. **Nomenclatura & Visibilidad**
   - Propón nombres alineados al lenguaje ubicuo y convenciones Python/Flask.
   - Identifica entidades públicas que deberían ser privadas o movidas.

10. **Indicador Global de Migrabilidad**
    - Asigna puntuación 0-100 basada en criterios anteriores.
    - Clasifica: Excelente (≥ 90), Buena (75-89), Aceptable (60-74), Mala (< 60).

---

## ALCANCE
Evalúa estructura, dependencias, nombres, complejidad, código muerto, preocupaciones transversales, pruebas, documentación y migrabilidad a Flask.
**Ignora** la lógica de dominio específica, pipelines CI/CD y requisitos de negocio.

---

# FORMATO DE SALIDA

## Preguntas Críticas
1. **¿[Pregunta]?** — Hipótesis: ✅ | ⚠️ | ❌ | ❓ — Evidencia: `<ruta:líneas>`
2. …

### Preguntas sin Evidencia (❓)
- …

---

## Mapa de Capas
<árbol anotado>


## Fortalezas
1. ✅ <Severidad NA> — <capa> — <ruta>: <frase>

## Debilidades
1. ⚠️ Alta — <capa> — <ruta>: <frase>

## Código Muerto & Complejidad
- <lista>

## Análisis de la Debilidad Crítica
- **Descripción**  
- **Por qué viola la arquitectura**  
- **Plan (≤ 5 pasos)** — esfuerzo / riesgo

## Dependencias & Preocupaciones Transversales
- <detalles / acciones>

## Revisión de Documentación
- /docs/architecture.md: <✅ | 🔄 | ❌> — <1 línea>  
- /README.md: <✅ | 🔄 | ❌> — <1 línea>  
- /ADR/: <✅ | 🔄 | ❌> — <1 línea>

## Indicador Global
**Puntuación:** <n>/100 — <clasificación>