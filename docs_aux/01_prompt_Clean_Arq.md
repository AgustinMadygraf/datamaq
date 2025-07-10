# GUÍA DE REFACTORIZACIÓN Y AUDITORÍA PARA DESACOPLAMIENTO BACKEND-FRONTEND (PHP → Python Ready)

## Objetivo
Guiar la refactorización y auditoría del sistema para lograr un backend completamente desacoplado del frontend, aplicando principios de arquitectura limpia. El objetivo es que el backend pueda ser implementado en PHP o migrado a Python (Flask) sin afectar al frontend, facilitando la evolución tecnológica.

---

## POLÍTICA DE ARQUITECTURA PARA DESACOPLAMIENTO Y MIGRACIÓN

1. El flujo de dependencias será **unidireccional: UI/Infra → Interfaces (Endpoints/API) → Application (Servicios) → Domain (Modelos)**.
2. El frontend (plantillas, JS, CSS) debe consumir solo APIs REST/JSON, nunca lógica de backend embebida.
3. Las capas internas solo dependen de **abstracciones**; las concretas se inyectan (por ejemplo, usando interfaces o inyección de dependencias).
4. **Sin dependencias** entre `domain` y librerías/frameworks externos (PHP o Python).
5. **Sin ciclos** detectables por herramientas de análisis de dependencias.
6. Complejidad ciclomática ≤ 10 por función; longitud de archivo ≤ 400 líneas.
7. Test coverage global ≥ 80 %; los tests de unidad no acceden a red, disco ni DB reales (usar mocks/fixtures).

---

## INSTRUCCIONES DE REVISIÓN Y REFACTORIZACIÓN

0. **Preguntas Críticas + Hipótesis**
   - Formula hasta 7 preguntas clave para el desacoplamiento y cumplimiento de la política.

1. **Mapa de Capas y Migrabilidad**
   - Muestra el árbol de carpetas (≤ 3 niveles).
   - Indica qué partes pueden migrarse 1:1 y cuáles requieren rediseño.

2. **Fortalezas / Debilidades para el Desacoplamiento y la Migración**
   - Listas separadas; ordena por impacto en el desacoplamiento y migración.
   - Para debilidades, añade Severidad (Alta/Media/Baja) y si bloquea la migración.

3. **Código Muerto, Acoplamientos y Complejidad**
   - Enumera símbolos sin referencias, funciones > 10 de complejidad, y acoplamientos difíciles de portar.
   - Indica si su eliminación o refactorización facilita el desacoplamiento y la migración.

**Puntuación:** <n>/100 — <clasificación>