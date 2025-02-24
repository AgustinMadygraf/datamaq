<?php
require_once __DIR__ . '/../core/ViewRenderer.php';
require_once __DIR__ . '/../helpers/CsrfHelper.php'; // Agregado para definir $csrfToken
$csrfToken = CsrfHelper::generateToken();
/*
    Esta vista espera que el controlador le pase los siguientes datos:
    - vel_ult_calculada: velocidad calculada lista para mostrar
    - formatoData: array con 'formato' y 'ancho_bobina'
    - gradient: array con 4 niveles para construir el degradado de fondo
*/
?>

<?php
    // Se construye el estilo de fondo utilizando el degradado ya calculado en el controlador.
    $estiloFondo = sprintf(
        "background: linear-gradient(195deg, rgb(107,170,34) %d%%, rgb(255,164,1) %d%%, rgb(234,53,34) %d%%, rgb(100,10,5) %d%%);",
        $gradient[3],
        $gradient[2],
        $gradient[1],
        $gradient[0]
    );

    // Renderizar la plantilla de la botonera
    $botoneraTemplate = __DIR__ . '/../../frontend/templates/botonera.html';
    $botoneraHtml = ViewRenderer::render($botoneraTemplate, [
        // Asumiendo que estas variables ya fueron definidas en un contexto global o previo:
        'csrfToken' => $csrfToken, 
        'periodo'   => $periodo,
        'conta'     => $conta,
        'refClass0' => $ref_class[$class[0]],
        'refClass1' => $ref_class[$class[1]],
        'refClass2' => $ref_class[$class[2]],
        'preConta'  => $conta - 1000 * $ls_periodos[$periodo],
        'postConta' => $conta + 1000 * $ls_periodos[$periodo],
    ]);

    // Renderizar la plantilla externa
    $template = __DIR__ . '/../../frontend/templates/info_display.html';
    echo ViewRenderer::render($template, [
        'estiloFondo'       => $estiloFondo,
        'vel_ult_calculada' => htmlspecialchars($vel_ult_calculada),
        'formato'           => htmlspecialchars($formatoData['formato']),
        'ancho_bobina'      => htmlspecialchars($formatoData['ancho_bobina']),
        'botonera'          => $botoneraHtml,
    ]);
?>