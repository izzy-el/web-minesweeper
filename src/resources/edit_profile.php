<?php
session_start();
$dbhost = 'localhost:3306';
$dbuser = 'root';
$dbpass = '';
$dbname = 'web_minesweeper';

// Conecta no banco de dados
try {
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}

if ($_POST["changePass"] == "true") {
    $pass = $_SESSION["password"];
    $newPass = $_POST["newPass"];
    $prevPass = $_POST["pass"];
    $id = $_SESSION["id"];

    try {
        if ($prevPass == $pass) {
            $query = "UPDATE users SET password='$newPass' WHERE id=$id";
            $conn->exec($query);

            $_SESSION["pass"] = $newPass;
            echo "Senha alterada com sucesso";
            exit();
        } else {
            echo "A senha inserida está incorreta";
            exit();
        }
    } catch (PDOException $e) {
        echo "Algo deu errado... : " + $e->getMessage();
    }
} else {
    $name = $_POST["name"];
    $birthday = $_POST["birthday"];
    $cpf = $_POST["cpf"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $user = $_POST["user"];
    $actualPassword = $_POST["actualPassword"];

    $pass = $_SESSION["password"];
    $id = $_SESSION["id"];

    try {
        if ($pass == $actualPassword) {
            $query = "UPDATE users SET name='$name' , phone='$phone' , email='$email' WHERE id=$id";
            $conn->exec($query);

            $_SESSION["name"] = $name;
            $_SESSION["phone"] = $phone;
            $_SESSION["email"] = $email;

            echo "Dados alterados";
            exit();
        } else {
            echo "A senha inserida está incorreta";
            exit();
        }
    } catch (PDOException $e) {
        echo "Algo deu errado... : " + $e->getMessage();
    }
}
