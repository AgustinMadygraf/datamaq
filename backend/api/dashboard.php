<?php
/*
Path: backend/api/dashboard.php
*/

// Configuración básica y carga de dependencias (agregar más require_once si es necesario)
require_once __DIR__ . '/../config/error_config.php';
require_once __DIR__ . '/../controllers/DashboardController.php';

try {
    // Centralizar la extracción y saneamiento de parámetros
    $params = filter_input_array(INPUT_GET, [
        'periodo' => FILTER_SANITIZE_STRING,
        'conta'   => FILTER_SANITIZE_NUMBER_INT,
    ]);

    // Reinyectar parámetros saneados para que Navigation los use
    if (isset($params['periodo'])) {
        $_GET['periodo'] = $params['periodo'];
    }
    if (isset($params['conta'])) {
        $_GET['conta'] = $params['conta'];
    }

    // Instanciar el controlador y llamar a index con respuesta API
    $controller = new DashboardController();
    $controller->index(true);
} catch (Exception $e) {
    error_log("dashboard.php API error: " . $e->getMessage());
    header('Content-Type: application/json; charset=utf-8', true, 500);
    echo json_encode(['status' => 'error', 'message' => "Ocurrió un error. Consulte los logs."]);
    exit;
}
