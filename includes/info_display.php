<?php
// Realizar el cálculo fuera de la estructura HTML para limpiar la presentación.
$vel_ult_calculada = round($vel_ult / 5, 1);
$estiloFondo = "background: linear-gradient(195deg, rgb(107,170,34) {$d[3]}%, rgb(255,164,1) {$d[2]}%, rgb(234,53,34) {$d[1]}%, rgb(100,10,5) {$d[0]}%);";

$sql = "SELECT * FROM `produccion_bolsas_aux`";
//conexcion a base de datos "registro_stock"
$conexion2 = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD, DB_NAME2);

if (!$conexion2) {
    die("Connection failed: " . mysqli_connect_error());
}

// Ejecutar la consulta
$result = mysqli_query($conexion2, $sql);

if ($result && mysqli_num_rows($result) > 0) {
    while ($row = mysqli_fetch_assoc($result)) {
        // Suponiendo que quieres el último valor (o adapta según tu lógica)
        $ID_formato = $row['ID_formato']; // Asume que las columnas existen
        $ancho_bobina = "{$row['ancho_bobina']} mm";
    }
} elseif (!$result) {
    echo "Error al ejecutar la consulta: " . mysqli_error($conexion2);
} else {
    echo "No se encontraron resultados.";
}

if (isset($ID_formato) && $ID_formato > 0) {
    $sql = "SELECT `formato` FROM `tabla_1` WHERE `ID_formato` = $ID_formato";
    $result = mysqli_query($conexion2, $sql);
    
    if ($result && mysqli_num_rows($result) > 0) {
        // Si hay resultados, obtener el primer resultado (debería ser único en este caso)
        $row = mysqli_fetch_assoc($result);
        $formato = $row['formato']; // Asignar el valor de la columna `formato`
    } else if (!$result) {
        echo "Error al ejecutar la consulta: " . mysqli_error($conexion2);
    } else {
        echo "No se encontró el formato correspondiente al ID.";
        $formato = "No especificado"; // O manejar como mejor te parezca
    }
} else {
    echo "ID de formato no definido o inválido.";
    $formato = "No especificado"; // Manejo de error o valor por defecto
}
?>

<div id="zero" class="hoja" style="<?php echo $estiloFondo; ?>">
    <div class="info">
        <div class="cabecera">
            <div class="c1">
                <p1>Velocidad <?php echo $vel_ult_calculada; ?> unidades por minuto</p1>
                <p1>Formato <?php echo $formato;?></p1>
                <p1>Ancho Bobina <?php echo $ancho_bobina;?></p1>
            </div>
        </div>
        <div id="container" class="graf"></div>
        <?php include "botonera.php"; ?>
    </div>
    <br><br><br>
</div>
