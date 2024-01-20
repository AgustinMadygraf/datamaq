<?php

include 'includes/database.php'; // O puedes usar require 'database.php';

// Proceso principal

try {
    $conexion = conectarBD($server, $usuario, $pass, $BD);
    $sql = "SELECT * FROM `inst_bt_a1`";
    $rawdata = getArraySQL($conexion, $sql);

    // Inicio de la tabla
    echo "<table>";

    // Cabecera de la tabla
    echo "<tr><th>Unixtime</th><th>Variación</th></tr>";

    // Cuerpo de la tabla
    for ($i = 15; $i < count($rawdata); $i++) {
        echo "<tr>";
        echo "<td>" . $rawdata[$i]['unixtime'] . "</td>";
        echo "<td>" . $rawdata[$i]['potencia_III'] . "</td>";
        echo "</tr>";
    }

    // Fin de la tabla
    echo "</table>";

    desconectarBD($conexion);
} catch (Exception $e) {
    echo 'Error: ' . $e->getMessage();
}
?>
