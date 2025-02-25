<?php
/*
Path: backend/views/info_display.php
*/
require_once __DIR__ . '/../core/ViewRenderer.php';
require_once __DIR__ . '/../helpers/CsrfHelper.php';

$csrfToken = CsrfHelper::generateToken();

// Construir el estilo de fondo
$estiloFondo = sprintf(
    "background: linear-gradient(195deg, rgb(107,170,34) %d%%, rgb(255,164,1) %d%%, rgb(234,53,34) %d%%, rgb(100,10,5) %d%%);",
    $gradient[3],
    $gradient[2],
    $gradient[1],
    $gradient[0]
);

// Renderizar primero la botonera
$botoneraTemplate = __DIR__ . '/../../frontend/templates/botonera.html';
$botoneraHtml = ViewRenderer::render($botoneraTemplate, [
    'csrfToken' => $csrfToken,
    'periodo' => $periodo,
    'conta' => $conta,
    'refClass0' => $ref_class[$class[0]],
    'refClass1' => $ref_class[$class[1]],
    'refClass2' => $ref_class[$class[2]],
    'preConta' => $conta - 1000 * $ls_periodos[$periodo],
    'postConta' => $conta + 1000 * $ls_periodos[$periodo]
]);

// Renderizar la plantilla principal
$template = __DIR__ . '/../../frontend/templates/info_display.html';
echo ViewRenderer::render($template, [
    'estiloFondo' => $estiloFondo,
    'vel_ult_calculada' => $vel_ult_calculada,
    'formato' => $formatoData['formato'],
    'ancho_bobina' => $formatoData['ancho_bobina'],
    'botonera' => $botoneraHtml
]);
?>