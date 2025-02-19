<?php
/*
Path: app/controllers/DashboardController.php
Este archivo contiene la lógica de control para la vista del panel de control.
*/

require_once __DIR__ . '/../models/DashboardModel.php';
require_once __DIR__ . '/../services/DashboardService.php';

class DashboardController {
    protected $service;
    protected $ls_periodos = [
        'semana' => 604800,
        'turno'  => 28800,
        'hora'   => 7200
    ];
    protected $ls_class = [
        'semana' => [1, 0, 0],
        'turno'  => [0, 1, 0],
        'hora'   => [0, 0, 1]
    ];
    protected $menos_periodo = [
        'semana' => 'turno',
        'turno'  => 'hora',
        'hora'   => 'hora'
    ];
    protected $pot = 0; // Valor por defecto para el cálculo del degradado

    public function __construct() {
        $dashboardModel = new DashboardModel();
        $this->service = new DashboardService($dashboardModel);
    }

    public function index() {
        // Determinar el período a mostrar (valor predeterminado: "semana")
        $periodo = 'semana';
        if ($_GET && array_key_exists("periodo", $_GET) && array_key_exists($_GET["periodo"], $this->ls_periodos)) {
            $periodo = $_GET["periodo"];
        }

        // Obtener los datos del dashboard usando el servicio
        $dashboardData = $this->service->getDashboardData($periodo);
        $vel_ult  = $dashboardData['vel_ult'];
        $unixtime = $dashboardData['unixtime'];
        $rawdata  = $dashboardData['rawdata'];

        // Procesar el parámetro "conta"
        $valorInicial = $unixtime * 1000;
        $conta = $valorInicial;
        if ($_GET && array_key_exists("conta", $_GET)) {
            $conta = $_GET["conta"];
            if ($conta > $valorInicial) {
                $conta = $valorInicial;
            }
        }

        // Calcular la ubicación para el degradado de advertencia
        $d = [];
        for ($i = 0; $i < 4; $i++) {
            $d[$i] = 350 - $this->pot - 10 * $i;
        }

        // Preparar los datos que la vista utilizará
        $data = [
            'periodo'       => $periodo,
            'ls_periodos'   => $this->ls_periodos,
            'menos_periodo' => $this->menos_periodo,
            'rawdata'       => $rawdata,
            'conta'         => $conta,
            'vel_ult'       => $vel_ult,
            'unixtime'      => $unixtime,
            'gradient'      => $d,
            'ls_class'      => $this->ls_class,
            'ref_class'     => ['presione', 'presado']
        ];

        // Retornar el arreglo de datos para que la vista lo utilice
        return $data;
    }
}