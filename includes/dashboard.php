<?php
/*
Path: includes/dashboard.php
Este archivo contiene la lógica para mostrar el dashboard de la aplicación.
*/

require_once 'includes/conn.php';
require_once __DIR__ . '/../app/models/DashboardModel.php';
require_once __DIR__ . '/../app/services/DashboardService.php';

date_default_timezone_set('America/Argentina/Buenos_Aires');
setlocale(LC_TIME, "spanish");
$segundos = 60; // Refrescar cada 60 segundos

// Variable que registra qué período de tiempo mostrar por defecto
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

// Instanciación del modelo y del servicio, que usa la clase Database vía DashboardModel
$dashboardModel = new DashboardModel();
$service = new DashboardService($dashboardModel);
$dashboardData = $service->getDashboardData($periodo);
$vel_ult  = $dashboardData['vel_ult'];
$unixtime = $dashboardData['unixtime'];
$rawdata  = $dashboardData['rawdata'];


header("Refresh:" . $segundos);

// Valores para la ubicación del degradado de advertencia
$d = array();
for ($i = 0; $i < 4; $i++) {
    $d[$i] = 350 - $pot - 10 * $i;
}

$date = date(DATE_RFC2822);
$newDate = date("D, d M Y" . (" 00:00:00") . " O");
$valorInicial = $unixtime * 1000;
$conta = $valorInicial;
if ($_GET && array_key_exists("conta", $_GET)) {
    $conta = $_GET["conta"];
    if ($conta > $valorInicial) {
        $conta = $valorInicial;
    }
}

?>