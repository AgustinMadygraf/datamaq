<?php 
/*
    Path: backend/views/header.php
    Se prepara el menú y se renderiza la plantilla externa.
*/

// Obtener la página actual y definir el menú
$paginaActual = basename($_SERVER['PHP_SELF']);
$menuItems   = [
    'index.php'              => 'Gráfico',
    'PanelControlModbus.php' => 'Estado del Equipo',
    '/DataMaq/formato.php'   => 'Formato'
];

// Renderizar la plantilla para el header
$template = __DIR__ . '/../../frontend/templates/header.html';
echo ViewRenderer::render($template, [
    'paginaActual' => $paginaActual,
    'menuItems'    => json_encode($menuItems) // la plantilla deberá iterar sobre este JSON en JS o conversión PHP
]);
