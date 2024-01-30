<?php
// Incluir el archivo con la función de conexión
include 'dashboard.php';

// Conectar a la base de datos local
$conexionLocal = conectarBD();

// Conectar a la base de datos remota
// Asegúrate de modificar las credenciales de conexión en conn.php para la base de datos remota
$conexionRemota = new mysqli('10.176.61.55', 'root', '12345678', 'novus');

// Verificar conexiones
if (!$conexionLocal) {
    die("Conexión local fallida.");
}
if ($conexionRemota->connect_error) {
    die("Conexión remota fallida: " . $conexionRemota->connect_error);
}

// Consulta para obtener datos de la base de datos local
$consultaLocal = "SELECT unixtime, HR_COUNTER1, HR_COUNTER2 FROM intervalproduction";
$datosLocales = getArraySQL($consultaLocal);

// Almacenar datos locales en un array para comparar
$datosLocalesIndexados = [];
foreach ($datosLocales as $fila) {
    $datosLocalesIndexados[$fila['unixtime']] = $fila;
}

// Comparar con datos remotos y enviar los que faltan
$consultaRemota = "SELECT unixtime FROM intervalproduction";
$resultadoRemoto = $conexionRemota->query($consultaRemota);

while ($fila = $resultadoRemoto->fetch_assoc()) {
    if (!array_key_exists($fila['unixtime'], $datosLocalesIndexados)) {
        // Si el registro no existe en la base de datos remota, enviarlo
        $unixtime = $fila['unixtime'];
        $HR_COUNTER1 = $datosLocalesIndexados[$unixtime]['HR_COUNTER1'];
        $HR_COUNTER2 = $datosLocalesIndexados[$unixtime]['HR_COUNTER2'];

        // Construir URL para enviar los datos
        $url = "http://10.176.61.55/DigiRail/includes/receiveAndUpdateDB.php?unixtime=".$unixtime."&HR_COUNTER1=".$HR_COUNTER1."&HR_COUNTER2=".$HR_COUNTER2;
        
        // Usar cURL para enviar la petición GET
        $ch = curl_init();
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, true);
        $response = curl_exec($ch);
        curl_close($ch);

        // Verificar respuesta
        if ($response !== false) {
            echo "Datos enviados y procesados: $response\n";
        } else {
            echo "Error al enviar datos para unixtime: $unixtime\n";
        }
    }
}

// Cerrar conexiones
desconectarBD($conexionLocal);
$conexionRemota->close();
?>
