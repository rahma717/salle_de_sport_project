<?php
require_once 'Database.php';

class UserDAO
{
    private $pdo;

    public function __construct()
    {
        try {
            $this->pdo = Database::getInstance("localhost", "salle_de_sport", "root", "");
        } catch (PDOException $e) {
            die(json_encode(["success" => false, "message" => "Erreur de connexion : " . $e->getMessage()]));
        }
    }

    public function insertUtilisateur($nom, $prenom, $anniversaire, $email, $telephone, $mot_de_passe)
    {
        try {
            $stmt = $this->pdo->prepare("
                INSERT INTO inscriptions (nom, prenom, anniversaire, email, telephone, password) 
                VALUES (:nom, :prenom, :anniversaire, :email, :telephone, :mot_de_passe)
            ");
            return $stmt->execute([
                ':nom' => $nom,
                ':prenom' => $prenom,
                ':anniversaire' => $anniversaire,
                ':email' => $email,
                ':telephone' => $telephone,
                ':mot_de_passe' => password_hash($mot_de_passe, PASSWORD_DEFAULT)
            ]);
        } catch (PDOException $e) {
            return false;
        }
    }

    public function getUtilisateurByEmail($email)
    {
        $stmt = $this->pdo->prepare("SELECT * FROM inscriptions WHERE email = ?");
        $stmt->execute([$email]);
        return $stmt->fetch(PDO::FETCH_ASSOC);
    }
}
