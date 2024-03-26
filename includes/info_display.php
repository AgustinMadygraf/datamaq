<?php
// Realizar el cálculo fuera de la estructura HTML para limpiar la presentación.
$vel_ult_calculada = round($vel_ult / 5, 1);
$estiloFondo = "background: linear-gradient(195deg, rgb(107,170,34) {$d[3]}%, rgb(255,164,1) {$d[2]}%, rgb(234,53,34) {$d[1]}%, rgb(100,10,5) {$d[0]}%);";
require_once 'includes/conn_stock.php';
require_once 'includes/db_functions.php';
$formato = "260 x 120 x  360";
$ancho_bobina = "790 mm";
?>

<div id="zero" class="hoja" style="<?php echo $estiloFondo; ?>">
    <div class="info">
        <div class="cabecera">
            <div class="c1">
                <p1>Velocidad <?php echo $vel_ult_calculada; ?> unidades por minuto</p1>
                <p1>Formato <?php echo $formato;?></p1>
                <p1>Ancho Bobina <?php echo $ancho_bobina;?></p1>
            </div>
        </div>
        <div id="container" class="graf"></div>
        <?php include "botonera.php"; ?>
    </div>
    <br><br><br>
</div>
