<?php
/*
Path: includes/info_display.php
Se ha refactorizado para separar la lógica de acceso a datos de la presentación.
*/

// Se asume que $vel_ult y $condition se definen previamente
if (!isset($condition)) { 
    $condition = false; 
}

$vel_ult_calculada = 0;
if (empty($vel_ult)) {
    $vel_ult_calculada = 0;
} elseif ($condition) {
    $vel_ult_calculada = round($vel_ult / 5, 1);
}

// Incluir el modelo que obtiene la información adicional
$formatoData = (isset($formatoData)) ? $formatoData : ['ID_formato' => 'No especificado', 'ancho_bobina' => 'No especificado', 'formato' => 'No especificado'];

$ID_formato   = $formatoData['ID_formato'];
$ancho_bobina = $formatoData['ancho_bobina'];
$formato      = $formatoData['formato'];

$estiloFondo = sprintf(
    "background: linear-gradient(195deg, rgb(107,170,34) %d%%, rgb(255,164,1) %d%%, rgb(234,53,34) %d%%, rgb(100,10,5) %d%%);",
    $gradient[3],
    $gradient[2],
    $gradient[1],
    $gradient[0]
);
?>

<style>
    .hoja{      box-sizing: border-box;
                border-radius: 25px;
                height: 100%;
                z-index: -1;}

    .info{      z-index: 2;
                position: relative;}

    .cabecera { background-color: rgba(240,240,240,.5);
                margin-bottom: 0.3em;
                /* z-index: 2; */
                position: relative;}

    .c1 {       text-align: center;
                font-family: verdana;
                padding-top: 5px;}

    .graf{      margin: 0 auto;
                width: 95%;}

    p2{         font-size:28pt;
                margin: 0;
                display: block;}

    p1 {        font-size:34pt;
                padding-bottom: 5px;
                display: block;}

</style>

<div id="zero" class="hoja" style="<?php echo $estiloFondo; ?>">
    <div class="info">
        <div class="cabecera">
            <div class="c1">
                <p2>Velocidad <?php echo $vel_ult_calculada; ?> unidades por minuto</p2>
                <p1>Formato <?php echo htmlspecialchars($formato); ?></p1>
                <p2>Ancho Bobina <?php echo htmlspecialchars($ancho_bobina); ?></p2>
            </div>
        </div>
        <div id="container" class="graf"></div>
        <?php include "botonera.php"; ?>
    </div>
    <br><br><br>
</div>