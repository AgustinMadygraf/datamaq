<?php
/*
Path: includes/db_functions.php
este archivo contiene funciones para interactuar con la base de datos.
*/


/**
 * Conectar a la base de datos.
 * @deprecated Use Database::getInstance()->getConnection() en su lugar.
 * @return mysqli $conexion Objeto de conexión.
 */
function conectarBD() {
    $conexion = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    if (!$conexion) {
        die("Error en la conexión: " . mysqli_connect_error());
    }
    return $conexion;
}

/**
 * Desconectar la conexión a la base de datos.
 *
 * @param mysqli $conexion Objeto de conexión a la base de datos.
 */
function desconectarBD($conexion) {
    if (!mysqli_close($conexion)) {
        die("Error al desconectar la base de datos.");
    }
}

/**
 * Obtener un array multidimensional con el resultado de la consulta SQL.
 *
 * @param string $sql La consulta SQL para ejecutar.
 * @return array $rawdata Array asociativo con los resultados de la consulta.
 */
function getArraySQL($sql) {
    $conexion = conectarBD();
    $result = mysqli_query($conexion, $sql);

    if (!$result) {
        die("Error en la consulta SQL: " . mysqli_error($conexion));
    }
    $rawdata = [];
    while ($row = mysqli_fetch_assoc($result)) {
        $rawdata[] = $row;
    }
    desconectarBD($conexion);
    return $rawdata;
}

/**
 * Ejecutar una operación de inserción en la base de datos.
 *
 * @param string $sql La sentencia SQL preparada para ejecutar.
 * @param array $params Los parámetros para vincular a la sentencia SQL preparada.
 * @return bool True en caso de éxito, False en caso contrario.
 */
function ejecutarInsercion($sql, $params) {
    $conexion = conectarBD();
    if ($stmt = mysqli_prepare($conexion, $sql)) {
        // Preparar los parámetros de tipo según la cantidad de elementos en $params
        $types = str_repeat('s', count($params)); // 's' significa string, cambia según necesidad
        mysqli_stmt_bind_param($stmt, $types, ...$params);
        
        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        desconectarBD($conexion);
        return $resultado;
    } else {
        desconectarBD($conexion);
        return false;
    }
}

/**
 * Ejecutar una operación de eliminación en la base de datos.
 *
 * @param string $sql La sentencia SQL preparada para ejecutar.
 * @param array $params Los parámetros para vincular a la sentencia SQL preparada.
 * @return bool True en caso de éxito, False en caso contrario.
 */
function ejecutarEliminacion($sql, $params) {
    $conexion = conectarBD();
    if ($stmt = mysqli_prepare($conexion, $sql)) {
        $types = str_repeat('s', count($params));
        mysqli_stmt_bind_param($stmt, $types, ...$params);

        $resultado = mysqli_stmt_execute($stmt);
        mysqli_stmt_close($stmt);
        desconectarBD($conexion);
        return $resultado;
    } else {
        desconectarBD($conexion);
        return false;
    }
}
?>
