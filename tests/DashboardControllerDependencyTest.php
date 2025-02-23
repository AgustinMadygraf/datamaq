<?php
use PHPUnit\Framework\TestCase;
require_once __DIR__ . '/MockNavigation.php';
require_once __DIR__ . '/../backend/controllers/DashboardController.php';

class DashboardControllerDependencyTest extends TestCase {
    public function testDependencyInjection() {
        // Prueba de integración: utilizando MockNavigation para inyectar dependencia en DashboardController.
        $mockNav = new MockNavigation();
        $controller = new DashboardController($mockNav);
        $data = $controller->index();
        // Validación mínima: se espera que el periodo retornado sea 'hora'
        $this->assertEquals('hora', $data['periodo'], "Se esperaba 'hora' como periodo.");
    }
}
