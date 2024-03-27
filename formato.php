<!--DataMaq/formato.php-->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Formato</title>
    <link rel="stylesheet" type="text/css" href="CSS/bootstrap.min.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/imagenes/favicon.ico" type="image/x-icon">
</head>
<body>
    <br>
    <br>
<?php
    require "includes/header.php";
    define('DB_SERVER', 'localhost');
    define('DB_USERNAME', 'root');
    define('DB_PASSWORD', '12345678');
    define('DB_NAME', 'registro_stock');
    require_once 'includes/db_functions.php';
    $sql = "SELECT * FROM `produccion_bolsas_aux`";
    $rawdata = getArraySQL($sql);
    //print_r($rawdata); //Array ( [0] => Array ( [ID] => 1 [ancho_bobina] => 790.00 [ID_formato] => 5 [Fecha] => 2024-02-06 10:00:00 ) )
?>


    <div class="container">
<<<<<<< HEAD
        <h1 class="text-center"> Últimos formatos</h1>
=======
        <h1 class="text-center">Estado del Equipo - Registros Modbus</h1>
>>>>>>> b64f7d1c5c59161681bd04374d21cf45668870ec
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Ancho bobina en mm</th>
                    <th>ID_formato</th>
<<<<<<< HEAD
                    <th>formato</th> <!-- Ayuda acá -->
=======
>>>>>>> b64f7d1c5c59161681bd04374d21cf45668870ec
                    <th>Desde</th>                    
                    <th>Hasta</th>                    
                </tr>
            </thead>
            <tbody>

    <?php
<<<<<<< HEAD
foreach ($rawdata as $row) {
    // Conectar a la BD
    $conexion = conectarBD();
    
    // Preparar la consulta SQL para obtener el formato basado en ID_formato
    $sqlFormato = "SELECT formato FROM tabla_1 WHERE ID_formato = ?";
    
    // Preparar la sentencia
    if ($stmt = mysqli_prepare($conexion, $sqlFormato)) {
        // Vincular el parámetro
        mysqli_stmt_bind_param($stmt, "i", $row['ID_formato']);
        
        // Ejecutar la consulta
        mysqli_stmt_execute($stmt);
        
        // Vincular el resultado
        mysqli_stmt_bind_result($stmt, $formato);
        
        // Obtener el valor
        mysqli_stmt_fetch($stmt);
        
        // Cerrar la sentencia
        mysqli_stmt_close($stmt);
    }
    
    // Desconectar de la BD
    desconectarBD($conexion);
    
    // Imprimir la fila con el formato obtenido
    echo "<tr>";
    echo "<td>" . htmlspecialchars($row['ID']) . "</td>";
    echo "<td>" . htmlspecialchars($row['ancho_bobina']) . "</td>";
    echo "<td>" . htmlspecialchars($row['ID_formato']) . "</td>";
    echo "<td>" . htmlspecialchars($formato) . "</td>"; // Formato obtenido de la segunda consulta
    echo "<td>" . htmlspecialchars($row['Fecha']) . "</td>"; 
    echo "<td>" . date("Y-m-d H:i:s") . "</td>";
    echo "</tr>";
}

=======
        foreach ($rawdata as $row) {
            echo "<tr>";
            echo "<td>" . $row['ID'] . "</td>";
            echo "<td>" . $row['ancho_bobina'] . "</td>";
            echo "<td>" . $row['ID_formato'] . "</td>";
            echo "<td>" . $row['Fecha'] . "</td>"; 
            echo "<td>" . date("Y-m-d H:i:s") . "</td>";
            echo "</tr>";
        }
>>>>>>> b64f7d1c5c59161681bd04374d21cf45668870ec
    ?>
            </tbody>
        </table>
</div>

<br><br><br>
<<<<<<< HEAD
<br><br><br>
<br><br><br>
<div class="container">
        <h1 class="text-center"> Agregar cambio de formato</h1>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>Ancho de Bobina en mm</th>
                    <th>ID de Formato</th>
                    <th>Formato</th>
                    <th>Fecha</th>
                </tr>
        </thead>
        <tbody>
=======
<table>
    <tr>
        <th>Ancho de Bobina en mm</th>
        <th>ID de Formato</th>
        <th>Fecha</th>
    </tr>
>>>>>>> b64f7d1c5c59161681bd04374d21cf45668870ec
    <tr>
        <form action="includes/procesar_1.php" method="post">
            <td><input type="number" name="ancho_bobina" required></td>        
            <td><select name="ID_formato" required>
                <option value="1">1</option>
                <option value="2">2</option>
                <option value="3">3</option>
                <option value="4">4</option>
                <option value="5">5</option>
                <option value="6">6</option>
                <option value="7">7</option>
                <option value="8">8</option>
                <option value="9">9</option>
                <option value="10">10</option>
<<<<<<< HEAD
            </select></td>
            <td><input type="text" name="formato" required></td>
            <td><input type="text" name="Fecha" value="<?php echo date("d-m-Y H:i:s"); ?>" readonly></td>            
            <td><input type="submit" value="Agregar"></td>
        </form>
    </tr>
    </tbody>
    </table>
</div>
=======
            <td><input type="text" name="Fecha" required></td>
            <td><input type="submit" value="Agregar"></td>
        </form>
    </tr>
</table>
>>>>>>> b64f7d1c5c59161681bd04374d21cf45668870ec


</body>
</html>