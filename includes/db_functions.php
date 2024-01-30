<?php
// db_functions.php

// Conectar a la base de datos
function conectarBD() {
    require 'conn.php';
    $BD = "novus";
    $conexion = mysqli_connect($server, $usuario, $pass, $BD);
    if (!$conexion) {
        die('Error en la conexión de la base de datos: ' . mysqli_connect_error());
    }
    return $conexion;
}

// Desconectar la conexión a la base de datos
function desconectarBD($conexion) {
    if (!mysqli_close($conexion)) {
        die('Error al desconectar la base de datos');
    }
}

// Obtener un array multidimensional con el resultado de la consulta
function getArraySQL($sql) {
    $conexion = conectarBD();
    if (!$result = mysqli_query($conexion, $sql)) {
        die('Error en la consulta SQL: ' . mysqli_error($conexion));
    }

    $rawdata = array();
    while ($row = mysqli_fetch_array($result)) {
        $rawdata[] = $row;
    }

    desconectarBD($conexion);
    return $rawdata;
}
?>
