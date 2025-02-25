<?php
/*
Path: backend/views/info_display.php
*/
require_once __DIR__ . '/../core/ViewRenderer.php';
require_once __DIR__ . '/../helpers/CsrfHelper.php';

$csrfToken = CsrfHelper::generateToken();

// Construir el estilo de fondo con opacidad ajustada
$estiloFondo = sprintf(
    "background: linear-gradient(195deg, rgba(107,170,34,0.9) %d%%, rgba(255,164,1,0.9) %d%%, rgba(234,53,34,0.9) %d%%, rgba(100,10,5,0.9) %d%%);",
    $gradient[3],
    $gradient[2],
    $gradient[1],
    $gradient[0]
);

// Renderizar la botonera primero
$botoneraTemplate = __DIR__ . '/../../frontend/templates/botonera.html';
$botoneraHtml = ViewRenderer::render($botoneraTemplate, [
    'csrfToken' => $csrfToken,
    'periodo' => $periodo,
    'conta' => $conta,
    'refClass0' => $ref_class[$class[0]] ?? 'presione',
    'refClass1' => $ref_class[$class[1]] ?? 'presione',
    'refClass2' => $ref_class[$class[2]] ?? 'presione',
    'preConta' => $conta - 1000 * $ls_periodos[$periodo],
    'postConta' => $conta + 1000 * $ls_periodos[$periodo]
]);

// Renderizar la plantilla principal con debug
$template = __DIR__ . '/../../frontend/templates/info_display.html';
$resultado = ViewRenderer::render($template, [
    'estiloFondo' => $estiloFondo,
    'vel_ult_calculada' => htmlspecialchars($vel_ult_calculada),
    'formato' => htmlspecialchars($formatoData['formato']),
    'ancho_bobina' => htmlspecialchars($formatoData['ancho_bobina']),
    'botonera' => $botoneraHtml
]);

// Agregar debug temporal
error_log("Botonera HTML generado: " . substr($botoneraHtml, 0, 500));

echo $resultado;
?>