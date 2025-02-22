<?php 
    /*
    Path: backend/views/header.php
    Este archivo contiene el código para el encabezado de la aplicación.
    */

    // Obtener la página actual
    $paginaActual = basename($_SERVER['PHP_SELF']);

    // Definir los elementos del menú
    $menuItems = [
        'index.php'              => 'Gráfico',
        'PanelControlModbus.php' => 'Estado del Equipo',
        '/DataMaq/formato.php'   => 'Formato'
    ];
?>
<style>
    .navbar-nav .nav-link.active {
        background-color: #4CAF50 !important;
        color: white;
    }
</style>

<header>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark fixed-top" role="navigation" aria-label="Main Navigation">
        <div class="container-fluid">
            <a class="navbar-brand" href="#">DataMaq</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent"
                    aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarSupportedContent">
                <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                    <?php foreach ($menuItems as $url => $titulo): ?>
                        <li class="nav-item">
                            <a class="nav-link <?php echo ($paginaActual == basename($url)) ? "active" : ""; ?>" href="<?php echo $url; ?>">
                                <?php echo $titulo; ?>
                            </a>
                        </li>
                    <?php endforeach; ?>
                    <li class="nav-item">
                        <a class="nav-link" href="/phpMyAdmin/" target="_blank" rel="noopener">PHP MyAdmin</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</header>