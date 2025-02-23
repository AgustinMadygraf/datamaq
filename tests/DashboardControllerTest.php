<?php
/*
Path: tests/DashboardControllerTest.php
*/

require_once __DIR__ . '/../backend/controllers/DashboardController.php';
require_once __DIR__ . '/../core/NavigationInterface.php';

// Dummy implementation for testing
class DummyNavigation implements NavigationInterface {
	public function getPeriod(): string {
		return 'semana';
	}
	public function getConta($valorInicial): int {
		return $valorInicial;
	}
}

$controller = new DashboardController(new DummyNavigation());
$data = $controller->obtenerDatos();

assert(is_array($data), 'obtenerDatos debe retornar un arreglo');
assert(isset($data['periodo']), 'El arreglo de datos debe contener "periodo"');
// ...otras aserciones según sea necesario...
echo "DashboardControllerTest passed.";
