<?php
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'web_minesweeper';

    $name = $_POST["name"];
    $birthday = $_POST["birthday"];
    $cpf = $_POST["cpf"];
    $phone = $_POST["phone"];
    $email = $_POST["email"];
    $user = $_POST["user"];
    $password = $_POST["password"];

    // Conecta no banco de dados
    try {
        $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
        $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
    } catch (PDOException $e) {
        echo "Connection Failed: " . $e->getMessage();
    }

    // Cadastra no banco
    try {
        $query = "SELECT * FROM users WHERE user = '$user'";
        $stmt = $conn->query($query);
        if ($stmt->rowCount() >= 1) {
            echo "Usuário já existe.";
            exit();
        }

        $query = "SELECT * FROM users WHERE email = '$email'";
        $stmt = $conn->query($query);
        if ($stmt->rowCount() >= 1) {
            echo "E-mail já cadastrado.";
            exit();
        }

        $query = "SELECT * FROM users WHERE cpf = '$cpf'";
        $stmt = $conn->query($query);
        if ($stmt->rowCount() >= 1) {
            echo "CPF já cadastrado.";
            exit();
        }

        $query = "INSERT INTO users(name, birthday, cpf, phone, email, user, password) VALUES ('$name', '$birthday', '$cpf', '$phone', '$email', '$user', '$password')";
        $conn->exec($query);
        echo "Registrado com sucesso!";
    } catch (PDOException $e) {
        echo "Algo deu errado... : " . $e->getMessage();
    }
