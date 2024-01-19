<?php
// obtener_variaciones.php
require "includes/database_connection.php";

function obtenerDatos() {
    global $conn;
    if ($conn->connect_error) {
        die("Conexión fallida: " . $conn->connect_error);
    }

    $sql1 = "DROP VIEW IF EXISTS `variacion`";
    $sql2 = "CREATE VIEW variacion AS 
    SELECT 
        a.ID, 
        a.unixtime,
        a.HR_COUNTER1_LO - COALESCE((SELECT b.HR_COUNTER1_LO 
                                    FROM maq_bolsas b 
                                    WHERE b.ID < a.ID 
                                    ORDER BY b.ID DESC 
                                    LIMIT 1), 0) AS variacion
    FROM 
        maq_bolsas a";

    if (!$conn->query($sql1)) {
        echo "Error al eliminar la vista: " . $conn->error;
    }

    if (!$conn->query($sql2)) {
        echo "Error al crear la vista: " . $conn->error;
    }

    $sql = "SELECT * FROM variacion";
    $result = $conn->query($sql);

    if (!$result) {
        // Manejar error de consulta aquí
        return null;
    }

    return $result;
}

function generarTabla($datos) {
    if ($datos->num_rows > 0) {
        echo "<table border='1'>";
        echo "<tr><th>ID</th><th>Unixtime</th><th>Variacion</th></tr>";

        while($row = $datos->fetch_assoc()) {
            echo "<tr><td>" . $row["ID"] . "</td><td>" . $row["unixtime"] . "</td><td>" . $row["variacion"] . "</td></tr>";
        }

        echo "</table>";
    } else {
        echo "0 resultados";
    }
}

$datos = obtenerDatos();
if ($datos) {
    generarTabla($datos);
} else {
    echo "Error al obtener datos.";
}

?>


