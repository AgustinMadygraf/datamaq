<?php
/*
Path: backend/helpers/CsrfHelper.php
Clase para manejar los tokens CSRF
*/

class CsrfHelper {
    /**
     * Genera un token CSRF y lo almacena en la sesión
     * @return string El token generado
     */
    public static function generateToken(): string {
        error_log("DEBUG - Generando nuevo token CSRF");
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }
        
        if (empty($_SESSION['csrf_token'])) {
            $_SESSION['csrf_token'] = bin2hex(random_bytes(32));
        }
        
        return $_SESSION['csrf_token'];
    }

    /**
     * Verifica si el token CSRF proporcionado es válido
     * @param string $token El token a verificar
     * @return bool true si el token es válido, false en caso contrario
     */
    public static function validateToken(?string $token): bool {
        error_log("DEBUG - Validando token CSRF");
        if (session_status() === PHP_SESSION_NONE) {
            session_start();
        }

        if (empty($_SESSION['csrf_token'])) {
            return false;
        }

        $isValid = hash_equals($_SESSION['csrf_token'], $token ?? '');
        error_log("DEBUG - Token CSRF " . ($isValid ? "válido" : "inválido"));
        return $isValid;
    }
}
?>