<?php
/*
Path: backend/views/botonera.php
*/

require_once __DIR__ . '/../helpers/CsrfHelper.php';
$csrfToken = CsrfHelper::generateToken();

// ...existing code que define $periodo, $conta, $ls_periodos, $ref_class y $class...

// Calcular los nuevos valores para la navegación
$preConta  = $conta - 1000 * $ls_periodos[$periodo];
$postConta = $conta + 1000 * $ls_periodos[$periodo];

// Renderizar la plantilla externa
$template = __DIR__ . '/../../templates/botonera.html';
echo ViewRenderer::render($template, [
    'csrfToken' => $csrfToken,
    'periodo'   => $periodo,
    'conta'     => $conta,
    'lsPeriodos'=> $ls_periodos, // si se requiere, se puede pasar en JSON
    'refClass0' => $ref_class[$class[0]],
    'refClass1' => $ref_class[$class[1]],
    'refClass2' => $ref_class[$class[2]],
    'preConta'  => $preConta,
    'postConta' => $postConta,
]);