<?php
/*
Path: backend/api/Router.php
*/

$requestMethod = $_SERVER['REQUEST_METHOD'];
$requestUri = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);

// Remove base path if necessary. Adjust this prefix based on your deployment.
$basePath = '/DataMaq/backend/api';
$endpoint = '/' . ltrim(substr($requestUri, strlen($basePath)), '/');

switch ($endpoint) {
    case '/dashboard':
        require_once __DIR__ . '/dashboard.php';
        break;
    // Add more routes as needed.
    default:
        header("HTTP/1.0 404 Not Found");
        echo json_encode(['status' => 'error', 'message' => 'Endpoint not found']);
        break;
}
