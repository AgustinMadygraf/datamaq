<?php
/*
Path: backend/core/ViewRenderer.php
*/
class ViewRenderer {
    /**
     * Renderiza una plantilla HTML reemplazando los marcadores
     * @param string $templatePath Ruta al archivo de plantilla
     * @param array $data Variables para inyectar en la plantilla
     * @return string HTML renderizado
     */
    public static function render($templatePath, array $data = []): string {
        // Verificar que el archivo existe
        if (!file_exists($templatePath)) {
            error_log("Template no encontrado: $templatePath");
            return '';
        }

        // Cargar el contenido de la plantilla
        $content = file_get_contents($templatePath);
        if ($content === false) {
            error_log("No se pudo leer el template: $templatePath");
            return '';
        }

        // Reemplazar los marcadores {{variable}} con los valores
        foreach ($data as $key => $value) {
            $content = str_replace('{{'.$key.'}}', $value, $content);
        }

        return $content;
    }
}
