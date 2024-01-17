<?php
// fetch_data.php

// Configuración de conexión a la base de datos
$host = 'localhost'; // O tu host de base de datos
$username = 'root'; // Usuario de la base de datos
$password = '12345678'; // Contraseña del usuario
$dbname = 'novus'; // Nombre de la base de datos

// Crear conexión
$conn = new mysqli($host, $username, $password, $dbname);

// Verificar conexión
if ($conn->connect_error) {
    die("Conexión fallida: " . $conn->connect_error);
}

$sql = "SELECT * FROM registros_modbus WHERE `valor` IS NOT NULL";
$result = $conn->query($sql);
$datos = array();

while($row = $result->fetch_assoc()) {
    $datos[] = $row;
}

echo json_encode($datos);

$conn->close();
