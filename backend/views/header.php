<?php 
// Se reemplaza la lógica PHP por la renderización de la plantilla estática de header.
require_once __DIR__ . '/../../frontend/templates/header.html';
echo file_get_contents(__DIR__ . '/../../frontend/templates/header.html');
?>