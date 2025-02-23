<?php
/*
Path: tests/MockDashboardModel.php
*/

require_once __DIR__ . '/../backend/models/DashboardModel.php'; // Incluir la clase base

class MockDashboardModel extends DashboardModel {
    public function getDashboardData($periodo = 'semana') {
        return [
            'vel_ult'   => 100,
            'unixtime'  => 123456789,
            'rawdata'   => []
        ];
    }
}
