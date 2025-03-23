<?php
session_start();
if (!isset($_SESSION['user'])) {
    header('Location: login.php');
    exit;
}
$prenom = htmlspecialchars($_SESSION['user']['prenom']);
?>

<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <title>Tableau de bord - FitnessPro Elite</title>
    <link rel="stylesheet" href="style.css">
</head>

<body>

    <div class="dashboard-container">
        <h1>Bienvenue, <?= $prenom ?> !</h1>
        <p>Vous êtes connecté 🎉</p>
        <a href="logout.php" class="btn-logout">Se déconnecter</a>
    </div>

</body>

</html>