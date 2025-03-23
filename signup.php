
<?php
header("Access-Control-Allow-Origin: *"); // Autorise tout domaine
header("Access-Control-Allow-Methods: POST, GET, OPTIONS"); // Autorise les méthodes HTTP
header("Access-Control-Allow-Headers: Content-Type"); // Autorise les headers
header("Content-Type: application/json");

// Vérifie que la requête est bien en POST
if ($_SERVER["REQUEST_METHOD"] !== "POST") {
    http_response_code(405);
    echo json_encode(["success" => false, "message" => "Méthode non autorisée"]);
    exit;
}

require_once 'UserDAO.php';

$dao = new UserDAO();

$nom = htmlspecialchars(trim($_POST['nom']));
$prenom = htmlspecialchars(trim($_POST['prenom']));
$anniversaire = $_POST['anniversaire'];
$email = filter_var($_POST['email'], FILTER_VALIDATE_EMAIL);
$telephone = preg_match("/^[0-9]{10}$/", $_POST['telephone']) ? $_POST['telephone'] : null;
$password = $_POST['password'];
$confirmPassword = $_POST['confirmPassword'];

// Vérifications des champs
if (!$email || !$telephone || strlen($password) < 8 || $password !== $confirmPassword) {
    echo json_encode(["success" => false, "message" => "Données invalides."]);
    exit;
}

// Vérifier si l'email existe déjà
if ($dao->getUtilisateurByEmail($email)) {
    echo json_encode(["success" => false, "message" => "Cet email est déjà utilisé."]);
    exit;
}

// Insérer l'utilisateur
if ($dao->insertUtilisateur($nom, $prenom, $anniversaire, $email, $telephone, $password)) {
    echo json_encode(["success" => true, "message" => "Inscription réussie !"]);
} else {
    echo json_encode(["success" => false, "message" => "Erreur lors de l'inscription."]);
}
?>
