<?php
/*
Path: includes/info_display.php
Este archivo contiene la lógica para mostrar la información en la aplicación.
*/


// Realizar el cálculo fuera de la estructura HTML para limpiar la presentación.
if ($vel_ult == null) {
    $vel_ult_calculada = 0;
} elseif ($condition) { // Nota el cambio aquí de else if a elseif y el uso correcto de llaves
    $vel_ult_calculada = round($vel_ult / 5, 1);
}

require_once 'conn.php';
$estiloFondo = "background: linear-gradient(195deg, rgb(107,170,34) {$d[3]}%, rgb(255,164,1) {$d[2]}%, rgb(234,53,34) {$d[1]}%, rgb(100,10,5) {$d[0]}%);";
$formato = "No especificado"; 
$ancho_bobina = "No especificado"; 
$ID_formato ="No especificado";

$sql = "SELECT * FROM `produccion_bolsas_aux`";
//conexcion a base de datos "registro_stock"
$conexion2 = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME2);

if (!$conexion2) {
    die("Connection failed: " . mysqli_connect_error());
}

try {
    // Ejecutar la consulta para obtener el último formato y ancho de bobina
    $sql = "SELECT * FROM `produccion_bolsas_aux` ORDER BY ID DESC LIMIT 1";
    $result = mysqli_query($conexion2, $sql);

    if ($result && mysqli_num_rows($result) > 0) {
        $row = mysqli_fetch_assoc($result);
        $ID_formato = $row['ID_formato'];
        $ancho_bobina = "{$row['ancho_bobina']} mm";

        // Segunda consulta para obtener el formato basado en el ID_formato
        $sql = "SELECT `formato` FROM `tabla_1` WHERE `ID_formato` = $ID_formato";
        $result = mysqli_query($conexion2, $sql);

        if ($result && mysqli_num_rows($result) > 0) {
            $row = mysqli_fetch_assoc($result);
            $formato = $row['formato'];
        }
    }
} catch (Exception $e) {
    // Manejo del error
    error_log("Error: " . $e->getMessage());
    // Considera mostrar un mensaje de error o redirigir a una página de error
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
