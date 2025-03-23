<?php
class Database
{
    private static $instance = null;
    private $pdo;

    private function __construct($host, $dbname, $user, $password)
    {
        try {
            $this->pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $user, $password);
            $this->pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        } catch (PDOException $e) {
            die(json_encode(["success" => false, "message" => "Erreur de connexion : " . $e->getMessage()]));
        }
    }

    public static function getInstance($host, $dbname, $user, $password)
    {
        if (self::$instance === null) {
            self::$instance = new Database($host, $dbname, $user, $password);
        }
        return self::$instance->pdo;
    }
}
