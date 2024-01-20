<?php

// Utilizando variables de entorno para configuraciones sensibles
$server = getenv('DB_SERVER') ?: 'localhost';
$usuario = getenv('DB_USER') ?: 'root';
$pass = getenv('DB_PASS') ?: '12345678';
$BD = getenv('DB_NAME') ?: 'novus';

// Funciones

function conectarBD($server, $usuario, $pass, $BD) {
    $conexion = mysqli_connect($server, $usuario, $pass, $BD);
    if (!$conexion) {
        throw new Exception('Error al conectar a la base de datos: ' . mysqli_connect_error());
    }
    return $conexion;
}

function desconectarBD($conexion) {
    if ($conexion instanceof mysqli && mysqli_ping($conexion)) {
        if (mysqli_close($conexion)) {
            return true;
        } else {
            throw new Exception('Error al cerrar la conexión a la base de datos.');
        }
    } else {
        throw new Exception('Intento de cerrar una conexión no activa o inválida.');
    }
}

function getArraySQL($conexion, $sql) {
    if (!$result = mysqli_query($conexion, $sql)) {
        throw new Exception('Error en la consulta SQL: ' . mysqli_error($conexion));
    }

    $rawdata = array();
    while ($row = mysqli_fetch_array($result)) {
        $rawdata[] = $row;
    }

    return $rawdata;
}
