# Arquitectura del Proyecto DigiRail

## Visión General
El sistema sigue principios de Arquitectura Limpia, separando responsabilidades en capas bien definidas para facilitar el mantenimiento, escalabilidad y pruebas.

## Capas y Responsabilidades

### 1. UI / Presentación
- **Ubicación:** `frontend/templates/`, `frontend/js/`, `frontend/img/`
- **Responsabilidad:** Renderizado de vistas, interacción con el usuario, consumo de datos preparados por el backend.
- **Regla:** No contiene lógica de negocio ni acceso a datos.

### 2. EntryPoint / Orquestación
- **Ubicación:** `index.php`, `PanelControlModbus.php`, otros entrypoints.
- **Responsabilidad:** Recibir la petición, delegar a controladores, renderizar vistas.
- **Regla:** No contiene lógica de negocio ni acceso a datos. Solo orquesta.

### 3. Controladores (Controllers)
- **Ubicación:** `backend/controllers/`
- **Responsabilidad:** Orquestar el flujo de la aplicación, obtener parámetros, invocar servicios, preparar datos para la vista.
- **Regla:** No accede directamente a la base de datos ni contiene lógica de presentación.

### 4. Servicios (Services)
- **Ubicación:** `backend/services/`
- **Responsabilidad:** Implementar la lógica de negocio, coordinar modelos y helpers.
- **Regla:** No accede directamente a la UI ni a la infraestructura.

### 5. Modelos (Models)
- **Ubicación:** `backend/models/`
- **Responsabilidad:** Acceso a datos, representación de entidades y persistencia.
- **Regla:** No contiene lógica de presentación ni orquestación.

### 6. Infraestructura y Helpers
- **Ubicación:** `backend/core/`, `backend/helpers/`, `backend/config/`, `includes/`
- **Responsabilidad:** Utilidades, helpers, configuración, conexión a base de datos, renderizado de vistas.
- **Regla:** No contiene lógica de negocio.

## Flujo de Dependencias
UI/Infra → Controllers → Services → Models

Las dependencias siempre fluyen hacia adentro. Las capas internas no conocen las externas.

## Buenas Prácticas
- No agregar lógica de negocio en entrypoints ni vistas.
- Toda lógica de negocio debe estar en servicios.
- El acceso a datos debe estar encapsulado en modelos.
- Los controladores solo orquestan y preparan datos para la vista.
- El frontend solo consume datos preparados.

## Ejemplo de Flujo
1. El usuario accede a `index.php`.
2. `index.php` instancia el controlador y solicita los datos.
3. El controlador obtiene parámetros, invoca servicios y recibe datos.
4. Los servicios coordinan modelos y helpers para obtener la información.
5. El controlador pasa los datos a la vista, que se renderiza y muestra al usuario.

## Notas
- Cualquier nueva funcionalidad debe seguir este flujo y respetar la separación de capas.
- Revisar y actualizar esta documentación ante cambios estructurales.
# Documentación de Arquitectura Actualizada

## 1. Separación de Responsabilidades (SRP)
- El DashboardController ahora delega la obtención de datos al método `obtenerDatos()`.
- La renderización se realiza a través de la clase `ViewRenderer`, desacoplando la lógica de negocio de la presentación.
- Se implementó un feature flag (`?use_new=true`) en index.php para alternar entre la renderización antigua y la nueva.

## 2. Inversión de Dependencias (DIP)
- Las dependencias se inyectan en el DashboardController a través de su constructor (ej.: `NavigationInterface`).
- Se han creado mocks/dummies (por ejemplo, `MockNavigation`) para facilitar las pruebas unitarias.
- El DashboardService ahora recibe instancias de DashboardModel mediante inyección de dependencias.

## 3. Renderización de Vistas
- Se centraliza la renderización mediante la clase `ViewRenderer`.
- Las vistas (botonera.php, info_display.php, header.php) se han refactorizado para trabajar únicamente con datos inyectados, eliminando accesos directos a superglobales.

## 4. Helpers y Acceso a Datos
- Los Helpers (e.g., CsrfHelper, GradientHelper) mantienen responsabilidades específicas sin mezclar lógica de presentación o negocio.
- Se revisaron las conexiones a la base de datos en Database.php y FormatoModel.php para asegurar un manejo aislado de datos.

## 5. Inyección de Dependencias (DIP) Actualizada
- Las dependencias se inyectan en DashboardController y DashboardService en lugar de instanciarlas internamente.
- Se recomienda inyectar implementaciones personalizadas (como MockNavigation) para mejorar la testabilidad.
- Ejemplo: En pruebas unitarias, se puede inyectar una instancia de MockNavigation en lugar de Navigation.
