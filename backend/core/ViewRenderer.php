<?php
/*
Path: backend/core/ViewRenderer.php
*/
class ViewRenderer {
    public static function render(string $templatePath, array $data = []): string {
        if (!file_exists($templatePath)) {
            return '';
        }
        $template = file_get_contents($templatePath);
        // Reemplazar marcadores tipo {{clave}} por su valor.
        foreach ($data as $key => $value) {
            if (is_array($value)) {
                $value = json_encode($value);
            }
            $template = str_replace('{{' . $key . '}}', $value, $template);
        }
        return $template;
    }
}
