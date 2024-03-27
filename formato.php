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
        <h1 class="text-center">Estado del Equipo - Registros Modbus</h1>
        <table class="table table-striped">
            <thead class="thead-dark">
                <tr>
                    <th>ID</th>
                    <th>Ancho bobina en mm</th>
                    <th>ID_formato</th>
                    <th>Desde</th>                    
                    <th>Hasta</th>                    
                </tr>
            </thead>
            <tbody>

    <?php
        foreach ($rawdata as $row) {
            echo "<tr>";
            echo "<td>" . $row['ID'] . "</td>";
            echo "<td>" . $row['ancho_bobina'] . "</td>";
            echo "<td>" . $row['ID_formato'] . "</td>";
            echo "<td>" . $row['Fecha'] . "</td>"; 
            echo "<td>" . date("Y-m-d H:i:s") . "</td>";
            echo "</tr>";
        }
    ?>
            </tbody>
        </table>
</div>

<br><br><br>
<table>
    <tr>
        <th>Ancho de Bobina en mm</th>
        <th>ID de Formato</th>
        <th>Fecha</th>
    </tr>
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
            <td><input type="text" name="Fecha" required></td>
            <td><input type="submit" value="Agregar"></td>
        </form>
    </tr>
</table>


</body>
</html>