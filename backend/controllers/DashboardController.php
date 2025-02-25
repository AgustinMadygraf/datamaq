<?php
/*
Path: backend/controllers/DashboardController.php
Este archivo contiene la lógica de control para la vista del panel de control.
*/

require_once __DIR__ . '/../models/DashboardModel.php';
require_once __DIR__ . '/../services/DashboardService.php';
require_once __DIR__ . '/../models/FormatoModel.php';
require_once __DIR__ . '/../core/NavigationInterface.php';
require_once __DIR__ . '/../core/Navigation.php';
require_once __DIR__ . '/../helpers/GradientHelper.php';

class DashboardController {
    protected $service;
    protected $navigation;
    
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
    protected $pot = 0;

    // Ahora inyectamos la dependencia de navegación.
    public function __construct(NavigationInterface $navigation = null) {
        $dashboardModel = new DashboardModel();
        $this->service = new DashboardService($dashboardModel);
        // Si no se provee una implementación, usamos la concreta por defecto.
        $this->navigation = $navigation ?: new Navigation();
    }

    public function index($asApiResponse = false) {
        try {
            // Obtiene el período y datos del dashboard
            $periodo = $this->navigation->getPeriod();
            $dashboardData = $this->service->getDashboardData($periodo);
            $vel_ult  = $dashboardData['vel_ult'];
            $unixtime = $dashboardData['unixtime'];
            $rawdata  = $dashboardData['rawdata'];

            // Procesar el parámetro "conta"
            $valorInicial = $unixtime * 1000;
            $conta        = $this->navigation->getConta($valorInicial);

            // Calcular el degradado usando el helper
            $d = GradientHelper::calculateGradient($this->pot);

            // Obtener la información de formato desde el modelo
            $formatoModel = new FormatoModel();
            $formatoData  = $formatoModel->getUltimoFormato();

            // Preparar los datos para la vista
            $data = [
                'periodo'             => $periodo,
                'ls_periodos'         => $this->ls_periodos,
                'menos_periodo'       => $this->menos_periodo,
                'rawdata'             => $rawdata,
                'chartData'           => $rawdata, // <-- Se agrega la información para el gráfico.
                'conta'               => $conta,
                'vel_ult'             => $vel_ult, // Variable original.
                'vel_ult_calculada'   => $vel_ult, // Agregado para la vista.
                'unixtime'            => $unixtime,
                'gradient'            => $d,
                'ls_class'            => $this->ls_class,
                'ref_class'           => ['presione', 'presado'],
                'formatoData'         => $formatoData
            ];

            if ($asApiResponse) {
                header('Content-Type: application/json; charset=utf-8');
                echo json_encode(['status' => 'success', 'data' => $data], JSON_UNESCAPED_UNICODE);
                exit;
            }

            // La presentación se delega a la capa de vistas.
            return $data;
        } catch (Exception $e) {
            error_log("DashboardController error: " . $e->getMessage());
            if ($asApiResponse) {
                header('Content-Type: application/json; charset=utf-8', true, 500);
                echo json_encode(['status' => 'error', 'message' => "Ocurrió un error. Consulte los logs."], JSON_UNESCAPED_UNICODE);
                exit;
            }
            // Optionally, handle non API errors
            throw $e;
        }
    }
}