<?php
/*
Path: app/controllers/dashboard_controller.php
Este archivo contiene la lógica de control para la vista del panel de control.
*/

require_once __DIR__ . '/../models/DashboardModel.php';

function getDashboardData() {
    $periodo = 'semana';
    $validPeriods = ['semana', 'turno', 'hora'];
    if (isset($_GET['periodo']) && in_array($_GET['periodo'], $validPeriods)) {
        $periodo = $_GET['periodo'];
    }
    $model = new DashboardModel();
    return $model->getDashboardData($periodo);
}
