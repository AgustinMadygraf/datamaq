<?php
/*
Path: backend/api/getData.php
*/

header('Content-Type: application/json');

// Simulación de datos (ajustar según la lógica de la aplicación)
$response = [
    'velocidad'   => '100', 
    'formato'     => 'A4', 
    'anchoBobina' => '50',
    'botoneraHtml'=> '<!-- botonera inyectada desde API -->',
    'menuItems'   => json_encode([
        'index.php'              => 'Gráfico',
        'PanelControlModbus.php' => 'Estado del Equipo',
        '/DataMaq/formato.php'   => 'Formato'
    ])
];

echo json_encode($response);
