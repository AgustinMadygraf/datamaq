<?php
/*
Path: tests/DashboardServiceTest.php
*/
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/MockDashboardModel.php';
require_once __DIR__ . '/../backend/services/DashboardService.php';

class DashboardServiceTest extends TestCase {
    public function testGetDashboardData() {
        $mockModel = new MockDashboardModel();
        $service = new DashboardService($mockModel);
        $data = $service->getDashboardData('semana');
        
        // Aserciones mínimas para validar datos del DashboardService.
        $this->assertEquals(100, $data['vel_ult'], "Se esperaba 100 como 'vel_ult'");
        $this->assertEquals(123456789, $data['unixtime'], "Se esperaba 123456789 en 'unixtime'");
        $this->assertIsArray($data['rawdata'], "rawdata debe ser un array");
    }
}
