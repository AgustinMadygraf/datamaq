<?php
/*
Path: backend/api/endpoints/DashboardEndpoint.php
API endpoint que devuelve datos del dashboard en formato JSON.
*/

// Habilitar reporte de errores para debugging (temporal, solo en desarrollo)
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Updated require_once path to fix file not found error
require_once __DIR__ . '/../../config/error_config.php';
require_once __DIR__ . '/../../controllers/DashboardController.php';

try {
    // Extraer parámetros y loguearlos para debugging
    $params = filter_input_array(INPUT_GET, [
        'periodo' => FILTER_SANITIZE_STRING,
        'conta'   => FILTER_SANITIZE_NUMBER_INT,
    ]);
    error_log("DashboardEndpoint input params: " . json_encode($params));

    // Validar que 'periodo' sea uno de los valores permitidos.
    $allowedPeriods = ['semana', 'turno', 'hora'];
    if (!in_array($params['periodo'] ?? 'semana', $allowedPeriods)) {
        $params['periodo'] = 'semana';
    }

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
    error_log("DashboardEndpoint error: " . $e->getMessage());
    header('Content-Type: application/json; charset=utf-8', true, 500);
    echo json_encode(['status' => 'error', 'message' => "Ocurrió un error. Consulte los logs."]);
    exit;
}
