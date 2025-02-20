<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Control y Registro de la Producción</title>
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
        $periodo = 'semana';
        $ls_periodos = ['semana' => 604800, 'turno' => 28800, 'hora' => 7200];
        $ls_class = ['semana' => [1, 0, 0], 'turno' => [0, 1, 0], 'hora' => [0, 0, 1]];
        $ref_class = ['presione', 'presado'];
        $menos_periodo = ['semana' => 'turno', 'turno' => 'hora', 'hora' => 'hora'];
        $pot = 0; // Define $pot con un valor por defecto
        
        // Comprobar si se cambió el período a través de GET
        if ($_GET && array_key_exists("periodo", $_GET)) {
            if (array_key_exists($_GET["periodo"], $ls_periodos)) {
                $periodo = $_GET["periodo"];
            }
        }
        $class = $ls_class[$periodo];
        
        require_once __DIR__ . '/includes/header.php';
        
        // Incluir el controlador usando la etiqueta de apertura completa y la ruta correcta
        require_once __DIR__ . '/app/controllers/DashboardController.php';
        
        // Instanciar el controlador y obtener los datos
        $controller = new DashboardController();
        $data = $controller->index();

        // Extraer las variables que la vista utilizará
        extract($data);

        // Incluir la vista para mostrar la información
        require_once __DIR__ . '/includes/info_display.php';
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