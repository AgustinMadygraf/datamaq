<?php
/*
Path: index.php
*/

// Nuevo: Redirigir peticiones API a Router.php
if (strpos($_SERVER['REQUEST_URI'], '/backend/api') !== false) {
    require_once __DIR__ . '/backend/api/Router.php';
    exit;
}

// Permitir acceso a archivos estáticos JS y CSS
if (preg_match('/\.(js|css)$/i', $_SERVER['REQUEST_URI'])) {
    // Esta es una solicitud de archivo estático
    $filePath = __DIR__ . parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
    if (file_exists($filePath)) {
        // Establecer el tipo de contenido correcto
        $extension = strtolower(pathinfo($filePath, PATHINFO_EXTENSION));
        $contentType = $extension === 'js' ? 'application/javascript' : 'text/css';
        header("Content-Type: $contentType");
        readfile($filePath);
        exit;
    }
    // Si el archivo no existe, continuamos con el flujo normal para que se muestre un 404
}

require_once __DIR__ . '/backend/config/error_config.php';
require_once __DIR__ . '/backend/core/ViewRenderer.php';
require_once __DIR__ . '/backend/helpers/CsrfHelper.php';

// Inicializar variables básicas para la vista inicial
$periodo = isset($_GET["periodo"]) && in_array($_GET["periodo"], ['semana', 'turno', 'hora']) ? $_GET["periodo"] : 'semana';
$conta = isset($_GET["conta"]) ? intval($_GET["conta"]) : null;

// Generar token CSRF para formularios
$csrfToken = CsrfHelper::generateToken();

// Renderizar las plantillas estáticas
$header = ViewRenderer::render(__DIR__ . '/frontend/templates/header.html');

// Renderizar la página principal con los datos mínimos necesarios para iniciar
echo ViewRenderer::render(__DIR__ . '/frontend/templates/main.html', [
    'header' => $header,
    'initialData' => json_encode([
        'periodo' => $periodo,
        'conta' => $conta,
        'csrfToken' => $csrfToken
    ])
]);

error_log("INFO - Renderizado básico completado - Memory usage: " . memory_get_peak_usage(true));
?>