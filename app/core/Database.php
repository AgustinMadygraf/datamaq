<?php
/*
Path: app/core/Database.php
Este archivo contiene la clase Database, que se encarga de manejar la conexión a la base de datos.
*/

class Database {
    private static $instance = null;
    private $connection;

    // Ajusta estas variables según tus constantes de configuración reales
    private $host = DB_SERVER;
    private $username = DB_USERNAME;
    private $password = DB_PASSWORD;
    private $dbname = DB_NAME;

    // Constructor privado para implementar el patrón Singleton
    private function __construct() {
        $this->connection = new mysqli($this->host, $this->username, $this->password, $this->dbname);
        if ($this->connection->connect_error) {
            die("Conexión fallida: " . $this->connection->connect_error);
        }
    }

    // Método estático para obtener la instancia única de la base de datos
    public static function getInstance() {
        if (!self::$instance) {
            self::$instance = new Database();
        }
        return self::$instance;
    }

    // Método para obtener la conexión activa
    public function getConnection() {
        return $this->connection;
    }
}
?>