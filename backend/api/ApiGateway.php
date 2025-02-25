<?php
/*
Path: backend/api/ApiGateway.php
*/

namespace Backend\Api;

require_once __DIR__ . '/../core/ViewRenderer.php';
require_once __DIR__ . '/responses/ApiResponse.php';

class ApiGateway {
    private const ALLOWED_METHODS = ['GET', 'POST', 'PUT', 'DELETE'];
    private const CONTENT_TYPE = 'Content-Type: application/json';
    
    /**
     * @var array Registra los endpoints disponibles y sus controladores
     */
    private $routes;

    public function __construct() {
        $this->routes = [
            'dashboard' => [
                'controller' => 'DashboardEndpoint',
                'methods' => ['GET']
            ],
            'test' => [
                'controller' => 'TestEndpoint',
                'methods' => ['GET']
            ]
        ];
    }

    /**
     * Procesa la solicitud entrante
     */
    public function handleRequest(): void {
        try {
            // Configurar headers
            header(self::CONTENT_TYPE);
            header('Access-Control-Allow-Origin: *');
            
            // Validar método HTTP
            $method = $_SERVER['REQUEST_METHOD'];
            if (!in_array($method, self::ALLOWED_METHODS)) {
                throw new \Exception("Método HTTP no permitido", 405);
            }

            // Obtener endpoint de la URL
            $endpoint = $this->getEndpointFromUrl();
            
            // Validar endpoint
            if (!isset($this->routes[$endpoint])) {
                throw new \Exception("Endpoint no encontrado", 404);
            }

            // Validar método para el endpoint
            if (!in_array($method, $this->routes[$endpoint]['methods'])) {
                throw new \Exception("Método no permitido para este endpoint", 405);
            }

            // Cargar y ejecutar controlador
            $controllerClass = "Backend\\Api\\Endpoints\\" . $this->routes[$endpoint]['controller'];
            $controller = new $controllerClass();
            $response = $controller->handle($method);

            // Enviar respuesta
            echo json_encode($response);

        } catch (\Exception $e) {
            $this->handleError($e);
        }
    }

    /**
     * Extrae el nombre del endpoint de la URL
     * @return string
     */
    private function getEndpointFromUrl(): string {
        $path = parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH);
        $segments = explode('/', trim($path, '/'));
        return end($segments);
    }

    /**
     * Maneja errores de forma consistente
     * @param \Exception $e
     */
    private function handleError(\Exception $e): void {
        $statusCode = $e->getCode() ?: 500;
        http_response_code($statusCode);
        
        echo json_encode([
            'error' => true,
            'message' => $e->getMessage(),
            'code' => $statusCode
        ]);
    }
}

// Inicializar y ejecutar
$gateway = new ApiGateway();
$gateway->handleRequest();