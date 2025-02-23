<?php
require_once __DIR__ . '/../backend/core/NavigationInterface.php';

class MockNavigation implements NavigationInterface {
    public function getPeriod(): string {
        return 'hora'; // Valor fijo para pruebas
    }
    public function getConta(int $valorInicial): int {
        return $valorInicial; // Retorna el mismo valor para pruebas
    }
}
