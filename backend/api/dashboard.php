<?php
/*
Path: backend/api/dashboard.php
*/

// Configuración básica y carga de dependencias (agregar más require_once si es necesario)
require_once __DIR__ . '/../config/error_config.php';
require_once __DIR__ . '/../controllers/DashboardController.php';

// Sanitizar parámetros GET 'periodo' y 'conta'
$periodo = filter_input(INPUT_GET, 'periodo', FILTER_SANITIZE_STRING) ?: null;
$conta   = filter_input(INPUT_GET, 'conta', FILTER_SANITIZE_NUMBER_INT) ?: null;

// Opcional: Sobre-escribir $_GET para que Navigation use parámetros sanitizados
if ($periodo !== null) {
    $_GET['periodo'] = $periodo;
}
if ($conta !== null) {
    $_GET['conta'] = $conta;
}

// Instanciar el controlador y llamar a index con respuesta API
$controller = new DashboardController();
$controller->index(true);
