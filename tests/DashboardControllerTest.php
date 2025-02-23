<?php
/*
Path: tests/DashboardControllerTest.php
*/

require_once __DIR__ . '/../backend/controllers/DashboardController.php';
require_once __DIR__ . '/../core/NavigationInterface.php';
class DashboardController {
    private $navigation;

    public function __construct(NavigationInterface $navigation) {
        $this->navigation = $navigation;
    }

    public function obtenerDatos(): array {
        return [
            'periodo' => $this->navigation->getPeriod(),
            // Add other data as needed...
        ];
    }

    // Other methods...
}