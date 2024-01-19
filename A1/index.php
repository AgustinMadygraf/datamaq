<!-- index.php -->
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <link rel="stylesheet" type="text/css" href="CSS/index.css">
    <link rel="stylesheet" type="text/css" href="CSS/header.css">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon">
    <link rel="icon" href="/imagenes/favicon.ico" type="image/x-icon">
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.0/jquery.min.js"></script>
    <script src="https://code.highcharts.com/highcharts.js"></script>
    <script src="https://code.highcharts.com/modules/series-label.js"></script>
    <script src="https://code.highcharts.com/modules/exporting.js"></script>
    <script src="https://code.highcharts.com/modules/export-data.js"></script>
    <script src="https://code.highcharts.com/modules/accessibility.js"></script>
    <script src="https://www.gstatic.com/charts/loader.js"></script>
    <style>
        /* Estilos para la tabla */
        table {
        border-collapse: collapse; /* Combina los bordes de las celdas */
        width: 100%;
        }

        /* Estilo para todas las celdas */
        table, th, td {
        border: 2px solid black; /* Define el grosor y el color del borde */
        }

        /* Estilo para las celdas de encabezado (th) */
        th {
        background-color: #f2f2f2; /* Color de fondo para las celdas de encabezado */
        }
    </style>

    
</head>
<body>

    <br>
    <br>
    <?php 
        //require "dashboard.php";
        //require "power_info_display.php";
        //require "chart_viewer.php"; 
        echo "<br><br>";
        //$sql = "SELECT *  from `inst_bt_a1` WHERE  unixtime > " . $tiempo1 . " AND unixtime <= " . $tiempo2 . " ORDER BY `unixtime` ASC ;";
        $sql = "SELECT `unixtime`,`variacion` FROM `variacion`";
        echo "sql: <br>".$sql."<br>";

        $rawdata = getArraySQL($sql);
        
        // Inicio de la tabla
        echo "<table>";
        
        // Cabecera de la tabla
        echo "<tr><th>Unixtime</th><th>Variación</th></tr>";
        
        // Cuerpo de la tabla
        for ($i = 15; $i < count($rawdata); $i++) {
            echo "<tr>";
            echo "<td>" . $rawdata[$i]['unixtime'] . "</td>";
            echo "<td>" . $rawdata[$i]['variacion'] . "</td>";
            echo "</tr>";
        }
        
        // Fin de la tabla
        echo "</table>";
        ?>
        

    ?>
</body>
</html>
