<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Control y Registro de la Producción</title>
    <link rel="stylesheet" type="text/css" href="CSS/index.css">
    <link rel="stylesheet" type="text/css" href="CSS/header.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/imagenes/favicon.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <script src="JS/chart_viewer.js"></script>
</head>
<body>
    <br>
    <br>
    <?php 
        require_once __DIR__ . '/includes/error_config.php';
        require "includes/dashboard.php";
        require "includes/header.php";
        require "includes/info_display.php";
    ?>     
    <script>
        window.chartData = {
            conta: <?= json_encode($conta) ?>,
            rawdata: <?= json_encode($rawdata) ?>,
            ls_periodos: <?= json_encode($ls_periodos) ?>,
            menos_periodo: <?= json_encode($menos_periodo) ?>,
            periodo: <?= json_encode($periodo) ?>
        };
    </script>
</body>
</html>