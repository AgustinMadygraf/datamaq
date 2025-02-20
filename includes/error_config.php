<?php
/*
Path: includes/error_config.php
*/

error_reporting(E_ALL);
ini_set('display_errors', 1);    // Mostrar errores en el navegador (útil en desarrollo)
ini_set('log_errors', 1);
ini_set('error_log', '/c:/AppServ/www/DataMaq/php_error.log'); // Ruta al archivo de log
?>
