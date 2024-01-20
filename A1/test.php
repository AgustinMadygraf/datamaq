<?php

include 'includes/database.php'; // Incluye el archivo con las funciones de base de datos

try {
    // Establece la conexión con la base de datos
    $conexion = conectarBD($server, $usuario, $pass, $BD);

    // Prepara la consulta SQL para obtener los datos de la vista
    $sql = "SELECT * FROM `variacion`"; // Asegúrate de que 'variacion' sea el nombre de tu vista

    // Obtiene los datos de la vista
    $rawdata = getArraySQL($conexion, $sql);

    // Inicio de la tabla para mostrar los datos
    echo "<table>";

    // Cabecera de la tabla
    echo "<tr><th>Unixtime</th><th>Variación</th></tr>";

    // Cuerpo de la tabla
    for ($i = 0; $i < count($rawdata); $i++) {
        echo "<tr>";
        echo "<td>" . $rawdata[$i]['unixtime'] . "</td>"; // Asegúrate de que 'unixtime' sea un campo de tu vista
        echo "<td>" . $rawdata[$i]['variacion'] . "</td>"; // Asegúrate de que 'variacion' sea un campo de tu vista
        echo "</tr>";
    }

    // Fin de la tabla
    echo "</table>";

    // Cierra la conexión
    desconectarBD($conexion);
} catch (Exception $e) {
    // Manejo de excepciones
    echo 'Error: ' . $e->getMessage();
}
?>
