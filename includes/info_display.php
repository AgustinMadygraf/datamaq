<?php
/*
Path: includes/info_display.php
Este archivo contiene la lógica para mostrar la información en la aplicación.
*/

// Se asume que $vel_ult y $condition se definen previamente
if (!isset($condition)) { $condition = false; }

$vel_ult_calculada = 0;
if (empty($vel_ult)) {
    $vel_ult_calculada = 0;
} elseif ($condition) {
    $vel_ult_calculada = round($vel_ult / 5, 1);
}

// Incluir conexión a base de datos
require_once 'conn.php';

// Definir estilos y valores predeterminados
$estiloFondo = sprintf(
    "background: linear-gradient(195deg, rgb(107,170,34) %d%%, rgb(255,164,1) %d%%, rgb(234,53,34) %d%%, rgb(100,10,5) %d%%);",
    $d[3],
    $d[2],
    $d[1],
    $d[0]
);
$formato       = "No especificado"; 
$ancho_bobina  = "No especificado"; 
$ID_formato    = "No especificado";

// Conexión a la base de datos "registro_stock"
$conexion2 = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME2);
if (!$conexion2) {
    die("Conexión fallida: " . mysqli_connect_error());
}

try {
    // Realizar un JOIN para obtener el último registro junto con el 'formato'
    $sql = "SELECT pb.*, t.formato 
            FROM produccion_bolsas_aux pb 
            LEFT JOIN tabla_1 t ON pb.ID_formato = t.ID_formato 
            ORDER BY pb.ID DESC LIMIT 1";
            
    $result = mysqli_query($conexion2, $sql);
    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $ID_formato   = $row['ID_formato'];
        $ancho_bobina = isset($row['ancho_bobina']) ? "{$row['ancho_bobina']} mm" : $ancho_bobina; 
        if (!empty($row['formato'])) {
            $formato = $row['formato'];
        }
    }
} catch (Exception $e) {
    error_log("Error: " . $e->getMessage());
    // Aquí se puede agregar una acción de notificación o redirección en caso de error
}
?>

<div id="zero" class="hoja" style="<?php echo $estiloFondo; ?>">
    <div class="info">
        <div class="cabecera">
            <div class="c1">
                <p2>Velocidad <?php echo $vel_ult_calculada; ?> unidades por minuto</p2>
                <p1>Formato <?php echo htmlspecialchars($formato); ?></p1>
                <p2>Ancho Bobina <?php echo htmlspecialchars($ancho_bobina); ?></p2>
            </div>
        </div>
        <div id="container" class="graf"></div>
        <?php include "botonera.php"; ?>
    </div>
    <br><br><br>
</div>