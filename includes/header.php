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
<style>
    

    /*---------------------------TOPNAV--------------------------*/

    .topnav ul {
            list-style-type: none;
            margin: 0;
            padding: 0;
            overflow: hidden;
            background-color: #333;
            position: fixed;
            top: 0;
            width: 100%;                     }

    .topnav li {  float: left;
                font-size: 16px;
                    }

    .topnav li a {
    display: block;
    color: white;
    text-align: center;
    padding: 12px 8px;
    text-decoration: none;
    }

    .topnav li a:hover:not(.active) {
    background-color: #111;
    }

    .topnav .active {
    background-color: #4CAF50;
    }

    @media screen and (max-width: 1275px) { .topnav li {font-size: 15px;         }}
    @media screen and (max-width: 1200px) { .topnav li {font-size: 14px;         }}
    @media screen and (max-width: 1150px) { .topnav li {font-size: 13px;         }}
    @media screen and (max-width: 1100px) { .topnav li {font-size: 12px;         }}
    @media screen and (max-width: 1075px) { .topnav li {font-size: 11px;         }}
    @media screen and (max-width: 1010px) { .topnav li {font-size: 10px;         }}
    @media screen and (max-width: 995px) { .topnav li {font-size: 9px;         }}

</style>

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