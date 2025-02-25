<?php
require_once __DIR__ . '/backend/core/ViewRenderer.php';

// Datos de prueba
$testData = [
    'titulo' => 'Prueba de Renderizado',
    'mensaje' => 'Si ves este mensaje, el renderer está funcionando.'
];

// Template de prueba
$testTemplate = __DIR__ . '/frontend/templates/test.html';

// Renderizar y mostrar
echo ViewRenderer::render($testTemplate, $testData);
