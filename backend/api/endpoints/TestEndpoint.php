<?php
/*
Path: backend/api/endpoints/TestEndpoint.php
*/

namespace Backend\Api\Endpoints;

use Backend\Api\Responses\ApiResponse;

class TestEndpoint {
    public function handle($method) {
        // ...existing code... (si es necesario procesar el método)
        $data = [
            'velocidad'   => '30', 
            'formato'     => '30x12x41', 
            'anchoBobina' => '880.00'
        ];
        return ApiResponse::success($data);
    }
}
