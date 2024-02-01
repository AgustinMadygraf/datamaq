<?php
// Incluir las funciones de la base de datos
require 'db_functions.php';

// Función para obtener los últimos 96 registros
function obtenerUltimosEstados($cantidad = 90) {
    $sql = "SELECT unixtime, HR_COUNTER1, HR_COUNTER2 FROM intervalproduction ORDER BY unixtime DESC LIMIT ?";
    $conexion = conectarBD();
    $stmt = $conexion->prepare($sql);
    $stmt->bind_param("i", $cantidad);
    $stmt->execute();
    $resultado = $stmt->get_result();
    $datos = $resultado->fetch_all(MYSQLI_ASSOC);
    desconectarBD($conexion);
    return $datos;
}




// Función para enviar cada estado
function enviarEstado($unixtime, $HR_COUNTER1, $HR_COUNTER2) {
    $url = "http://10.176.61.55/DigiRail/includes/receiveAndUpdateDB.php?unixtime=$unixtime&HR_COUNTER1=$HR_COUNTER1&HR_COUNTER2=$HR_COUNTER2";
    // Aquí puedes agregar el código para enviar el estado usando cURL o file_get_contents
    echo "Enviando estado: $unixtime <br>$url<br>"; // Solo para propósitos de depuración
}



// Preparar los datos para la respuesta
$estados = obtenerUltimosEstados();
echo "json_encode: <br>".json_encode($estados)."<br><br><br><br>";

// Enviar cada estado con un intervalo entre ellos
foreach ($estados as $estado) {
    enviarEstado($estado['unixtime'], $estado['HR_COUNTER1'], $estado['HR_COUNTER2']);
    sleep(0.01); // Esperar 1 segundo entre cada envío para evitar saturar la red
}
?>
