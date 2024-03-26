<!--DataMaq\includes\db_functions.php-->
<?php

/**
 * Conectar a la base de datos.
 *
 * @return mysqli $conexion Objeto de conexión a la base de datos.
 */
function conectarBD() {
    $conexion = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME);
    if (!$conexion) {
        die("Error en la conexión de la base de datos: " . mysqli_connect_error());
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
?>
