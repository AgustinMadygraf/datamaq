<!-- dashboard.php -->
<?php
date_default_timezone_set('America/Argentina/Buenos_Aires');
setlocale(LC_TIME, "spanish");
$segundos = 60;   // Refrescar cada 60 segundos


// Variable que registra qué período de tiempo mostrar por defecto
$periodo = 'semana';
$ls_periodos = ['mes' => 2419200, 'semana' => 604800, 'turno' => 28800];
$ls_class = ['mes' => [1, 0, 0], 'semana' => [0, 1, 0], 'turno' => [0, 0, 1]];
$ref_class = ['presione', 'presado'];
$menos_periodo = ['mes' => 'semana', 'semana' => 'turno', 'turno' => 'turno'];

// Comprobar si se cambió el período a través de GET
if ($_GET && array_key_exists("periodo", $_GET)) {
    if (array_key_exists($_GET["periodo"], $ls_periodos)) {
        $periodo = $_GET["periodo"];
    }
}
$class = $ls_class[$periodo];

// Conectar a la base de datos
function conectarBD() {
    require 'includes/conn.php';
    $BD = "powermeter";
    $conexion = mysqli_connect($server, $usuario, $pass, $BD);
    if (!$conexion) {
        echo 'Ha sucedido un error inesperado en la conexión de la base de datos<br>';
    }
    return $conexion;
}

// Desconectar la conexión a la base de datos
function desconectarBD($conexion) {
    $close = mysqli_close($conexion);
    if (!$close) {
        echo 'Ha sucedido un error inesperado en la desconexión de la base de datos<br>';
    }
    return $close;
}

// Obtener un array multidimensional con el resultado de la consulta
function getArraySQL($sql) {
    $conexion = conectarBD();
    if (!$result = mysqli_query($conexion, $sql)) die();

    $rawdata = array();
    $i = 0;
    while ($row = mysqli_fetch_array($result)) {
        $rawdata[$i] = $row;
        $i++;
    }

    desconectarBD($conexion);
    return $rawdata;
}

function sql_query($campo) {
    return "SELECT `unixtime`, `$campo` FROM `inst_bt_a1`  ORDER BY `unixtime` DESC LIMIT 1";
}

$res = getArraySQL(sql_query("potencia_III"));
$unixtime = $res[0]['unixtime'] ;




// Si la variable 'test' aparece en $_GET, el refresco se hace cada segundo en vez de cada 20 segundos.
header("Refresh:" . $segundos);

// Valores para la ubicación del degradado de advertencia
$d = array();
for ($i = 0; $i < 4; $i++) {
    $d[$i] = 350 - $pot - 10 * $i;
}

$date = date(DATE_RFC2822);
$newDate = date("D, d M Y" . (" 00:00:00") . " O");

$valorInicial = $unixtime * 1000;
$conta = $valorInicial;
if ($_GET && array_key_exists("conta", $_GET)) {
    $conta = $_GET["conta"];
    if ($conta > $valorInicial) {
        $conta = $valorInicial;
    }
}

$tiempo1 = ($conta/1000) - $ls_periodos[$periodo] - 80*60;
$tiempo2 = $conta/1000 ;
$sql = "SELECT `unixtime`, `potencia_III`  from `inst_bt_a1` WHERE  unixtime > " . $tiempo1 . " AND unixtime <= " . $tiempo2 . " ORDER BY `unixtime` ASC ;";
$rawdata = getArraySQL($sql);

echo "<br><br>";
$sql2 = "SELECT *  from `variacion` ";
//$rawdata2 = getArraySQL($sql2);

?>
