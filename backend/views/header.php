<?php
/*
Path: backend/views/header.php
*/

require_once __DIR__ . '/../core/ViewRenderer.php';


// Obtener la página actual y definir el menú
$paginaActual = basename($_SERVER['PHP_SELF']);
$menuItems = [
    'index.php' => 'Gráfico',
    'PanelControlModbus.php' => 'Estado del Equipo',
    '/DataMaq/formato.php' => 'Formato'
];

$menuHtml = '';
foreach ($menuItems as $url => $titulo) {
    $active = ($paginaActual == basename($url)) ? "active" : "";
    $menuHtml .= "<li class='nav-item'><a class='nav-link $active' href='$url'>$titulo</a></li>";
}

// Renderizar la plantilla para el header
$template = __DIR__ . '/../../frontend/templates/header.html';
echo ViewRenderer::render($template, [
    'menuItems' => $menuHtml
]);
