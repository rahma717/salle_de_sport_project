<?php
require_once 'UserDAO.php';

$email = $_POST['email'];
$password = $_POST['password'];

$dao = new UserDAO();
$user = $dao->getUtilisateurByEmail($email);

if ($user && password_verify($password, $user['password'])) {
    session_start();
    $_SESSION['user'] = $user;
    echo "Connexion réussie !";
} else {
    echo "Identifiants invalides.";
}
