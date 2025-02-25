<?php
/*
Path: backend/api/endpoints/TestEndpoint.php
*/

header('Content-Type: application/json');

// Simulación de datos (ajustar según la lógica de la aplicación)
$response = [
    'velocidad'   => '30', 
    'formato'     => '30x12x41', 
    'anchoBobina' => '880.00'
];

echo json_encode($response);
