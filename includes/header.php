<?php 
/*
Path: includes/header.php
Este archivo contiene el código para el encabezado de la aplicación.
*/

// Obtener la página actual
$paginaActual = basename($_SERVER['PHP_SELF']);

// Definir los elementos del menú
$menuItems = [
    'index.php'              => 'DataMaq',
    'PanelControlModbus.php' => 'Estado del Equipo',
    '/DataMaq/formato.php'   => 'Formato'
];
?>

<header>
    <br><br><br>
    <div class="topnav">
        <ul>
            <?php foreach ($menuItems as $url => $titulo): ?>
                <li>
                    <a href="<?php echo $url; ?>" <?php echo ($paginaActual == basename($url)) ? "class='active'" : ""; ?>>
                        <?php echo $titulo; ?>
                    </a>
                </li>
            <?php endforeach; ?>
            <li>
                <a href="/phpMyAdmin/" target="_blank">PHP MyAdmin</a>
            </li>
        </ul>
    </div>
</header>