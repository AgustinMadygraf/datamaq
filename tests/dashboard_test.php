<?php
/*
Path: tests/dashboard_test.php
Script de prueba para el endpoint experimental dashboard_test.php.
*/

$url = "http://localhost/DataMaq/backend/api/dashboard_test.php?periodo=semana";
$response = file_get_contents($url);
$json = json_decode($response, true);

if (json_last_error() !== JSON_ERROR_NONE) {
    echo "Error al decodificar JSON.\n";
    exit(1);
}

$valid = isset($json['status']) && $json['status'] === 'success' &&
         isset($json['dashboard']) && is_array($json['dashboard']) &&
         isset($json['navigation']) && is_array($json['navigation']);

if ($valid) {
    echo "Prueba exitosa.\n";
    print_r($json);
    exit(0);
} else {
    echo "Fallo la prueba.\n";
    print_r($json);
    exit(1);
}
