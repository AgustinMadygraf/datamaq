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
