<?php
/*
Path: backend/core/ViewRenderer.php
*/
class ViewRenderer {
    public static function render(string $templatePath, array $data = []): string {
        if (!file_exists($templatePath)) {
            return ''; // Archivo no encontrado
        }
        $template = file_get_contents($templatePath);
        // Reemplazar marcadores del tipo {{clave}} por su valor
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                // Asumir que valores complejos se pasan como JSON y serán gestionados por la plantilla si es necesario
                $value = json_encode($value);
            }
            $template = str_replace('{{' . $key . '}}', $value, $template);
        }
        return $template;
    }
}
