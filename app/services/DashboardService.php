<?php
/*
Path: app/services/DashboardService.php
Este archivo contiene la lógica de negocio para la vista del panel de control.
*/

require_once __DIR__ . '/../models/DashboardModel.php';

class DashboardService {
    protected $model;
    
    public function __construct() {
        $this->model = new DashboardModel();
    }
    
    public function getDashboardData($periodo = 'semana') {
        return $this->model->getDashboardData($periodo);
    }
}
