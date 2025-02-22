<?php
/*
    Esta vista espera que el controlador le pase los siguientes datos:
    - vel_ult_calculada: velocidad calculada lista para mostrar
    - formatoData: array con 'formato' y 'ancho_bobina'
    - gradient: array con 4 niveles para construir el degradado de fondo
*/
?>
<style>
    .hoja {
        box-sizing: border-box;
        border-radius: 25px;
        height: 100%;
        z-index: -1;
    }
    .info {
        z-index: 2;
        position: relative;
    }
    .cabecera {
        background-color: rgba(240,240,240,.5);
        margin-bottom: 0.3em;
        position: relative;
    }
    .c1 {
        text-align: center;
        font-family: verdana;
        padding-top: 5px;
    }
    .graf {
        margin: 0 auto;
        width: 95%;
    }
    p2 {
        font-size:28pt;
        margin: 0;
        display: block;
    }
    p1 {
        font-size:34pt;
        padding-bottom: 5px;
        display: block;
    }
</style>

<?php
    // Se construye el estilo de fondo utilizando el degradado ya calculado en el controlador.
    $estiloFondo = sprintf(
        "background: linear-gradient(195deg, rgb(107,170,34) %d%%, rgb(255,164,1) %d%%, rgb(234,53,34) %d%%, rgb(100,10,5) %d%%);",
        $gradient[3],
        $gradient[2],
        $gradient[1],
        $gradient[0]
    );
?>
<div id="zero" class="hoja" style="<?php echo $estiloFondo; ?>">
    <div class="info">
        <div class="cabecera">
            <div class="c1">
                <p2>Velocidad <?php echo htmlspecialchars($vel_ult_calculada); ?> unidades por minuto</p2>
                <p1>Formato <?php echo htmlspecialchars($formatoData['formato']); ?></p1>
                <p2>Ancho Bobina <?php echo htmlspecialchars($formatoData['ancho_bobina']); ?></p2>
            </div>
        </div>
        <div id="container" class="graf"></div>
        <?php include __DIR__ . '/botonera.php'; ?>
    </div>
    <br><br><br>