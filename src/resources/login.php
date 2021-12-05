<?php
session_start();
$dbhost = 'localhost:3306';
$dbuser = 'root';
$dbpass = '';
$dbname = 'web_minesweeper';

$user = $_POST["user"];
$password = $_POST["password"];

// Conecta no banco de dados
try {
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}

// Checa informações no banco
try {
    $query = "SELECT * FROM users WHERE user = '$user' AND password = '$password'";
    $stmt = $conn->query($query);
    if ($stmt->rowCount() >= 1) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            // Precisa testar se isso aqui tá certo
            $_SESSION["name"] = $row["name"];
            $_SESSION["birthday"] = $row["birthday"];
            $_SESSION["cpf"] = $row["cpf"];
            $_SESSION["phone"] = $row["phone"];
            $_SESSION["email"] = $row["email"];
        }
        $_SESSION["username"] = $user;
        $_SESSION["password"] = $password;
        echo "Logado";
        exit();
    } else {
        echo "Usuário ou senha incorreta.";
        exit();
    }
} catch (PDOException $e) {
    echo "Algo deu errado... : " + $e->getMessage();
}
