<?php
session_start();
require_once 'UserDAO.php';

$erreur = "";

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = $_POST['email'] ?? '';
    $password = $_POST['password'] ?? '';

    $dao = new UserDAO();
    $utilisateur = $dao->getUtilisateurByEmail($email);

    if ($utilisateur && password_verify($password, $utilisateur['password'])) {
        $_SESSION['user'] = $utilisateur;
        header("Location: dashboard.php");
        exit;
    } else {
        $erreur = "Identifiants incorrects.";
    }
}
?>
<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - FitnessPro Elite</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="login-container">
        <h2>Connexion</h2>

        <?php if (!empty($erreur)) : ?>
            <p class="error-message"><?= htmlspecialchars($erreur) ?></p>
        <?php endif; ?>

        <form method="POST">
            <label for="email">Email :</label>
            <input type="email" id="email" name="email" autocomplete="email" required>

            <label for="password">Mot de passe :</label>
            <input type="password" id="password" name="password" required>

            <button type="submit" class="btn-primary">Se connecter</button>
        </form>
    </div>

</body>

</html>