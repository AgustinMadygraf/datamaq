<?php

// Configuración de la conexión a la base de datos remota
$dbRemota = new mysqli('10.176.61.55', 'root', '12345678', 'novus');

// Verificar conexión
if ($dbRemota->connect_error) {
    die("Conexión fallida: " . $dbRemota->connect_error);
}

// Recuperar datos de la URL
$unixtime = isset($_GET['unixtime']) ? $_GET['unixtime'] : null;
$HR_COUNTER1 = isset($_GET['HR_COUNTER1']) ? $_GET['HR_COUNTER1'] : null;
$HR_COUNTER2 = isset($_GET['HR_COUNTER2']) ? $_GET['HR_COUNTER2'] : null;

// Validar los datos recibidos
if ($unixtime === null || $HR_COUNTER1 === null || $HR_COUNTER2 === null) {
    die("Datos incompletos o incorrectos.");
}

// Preparar la consulta SQL para verificar si el registro ya existe
$consultaExistente = "SELECT COUNT(*) FROM intervalproduction WHERE unixtime = ?";
$stmt = $dbRemota->prepare($consultaExistente);
$stmt->bind_param("i", $unixtime);
$stmt->execute();
$resultado = $stmt->get_result();
$fila = $resultado->fetch_array();
$existe = $fila[0] > 0;

// Si el registro no existe, insertarlo en la base de datos
if (!$existe) {
    $insertarSQL = "INSERT INTO intervalproduction (unixtime, HR_COUNTER1, HR_COUNTER2) VALUES (?, ?, ?)";
    $stmt = $dbRemota->prepare($insertarSQL);
    $stmt->bind_param("iii", $unixtime, $HR_COUNTER1, $HR_COUNTER2);

    if ($stmt->execute()) {
        echo "Registro insertado con éxito.";
    } else {
        echo "Error al insertar el registro: " . $stmt->error;
    }
} else {
    echo "El registro ya existe.";
}

// Cerrar conexión
$dbRemota->close();
?>
