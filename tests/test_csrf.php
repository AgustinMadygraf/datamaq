<?php
require_once __DIR__ . '/backend/helpers/CsrfHelper.php';

// Generar un token
$token = CsrfHelper::generateToken();

// Mostrar un formulario de prueba
echo <<<HTML
<!DOCTYPE html>
<html>
<head>
    <title>Prueba CSRF</title>
</head>
<body>
    <h1>Formulario de prueba CSRF</h1>
    <form method="post">
        <input type="hidden" name="csrf_token" value="$token">
        <input type="submit" value="Enviar">
    </form>
</body>
</html>
HTML;

// Si es una petición POST, verificar el token
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $isValid = CsrfHelper::validateToken($_POST['csrf_token'] ?? null);
    echo "<p>Token " . ($isValid ? "válido" : "inválido") . "</p>";
}
