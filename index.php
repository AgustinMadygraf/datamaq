<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Control y Registro de la Producción</title>
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="frontend/img/favicon.ico" type="image/x-icon">
    <link rel="icon" href="frontend/img/favicon.ico" type="image/x-icon">
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <!-- Se agrega la librería Chart.js -->
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
    <!-- Se carga el ChartController como módulo -->
    <script type="module" src="frontend/js/modules/ChartController.js"></script>
</head>
<body>
    <br>
    <br>
    <?php 
        require_once __DIR__ . '/backend/config/error_config.php';
        $periodo = 'semana';
        $ls_periodos = ['semana' => 604800, 'turno' => 28800, 'hora' => 7200];
        $ls_class = ['semana' => [1, 0, 0], 'turno' => [0, 1, 0], 'hora' => [0, 0, 1]];
        $ref_class = ['presione', 'presado'];
        $menos_periodo = ['semana' => 'turno', 'turno' => 'hora', 'hora' => 'hora'];
        $pot = 0; // Define $pot con un valor por defecto
        
        if ($_GET && array_key_exists("periodo", $_GET)) {
            if (array_key_exists($_GET["periodo"], $ls_periodos)) {
                $periodo = $_GET["periodo"];
            }
        }
        $class = $ls_class[$periodo];
        
        require_once __DIR__ . '/backend/views/partials/header.php';
        
        require_once __DIR__ . '/backend/controllers/DashboardController.php';
        
        $controller = new DashboardController();
        $data = $controller->index();
        // Extraer las variables de $data para poder usarlas en el script
        extract($data);

        require_once __DIR__ . '/backend/views/info_display.php';

        // Delegar la renderización a la plantilla HTML
        include __DIR__ . '/frontend/templates/index.html';
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
    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>