<?php
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'web_minesweeper';

    $user = $_POST["user"];
    $cpf = $_POST["cpf"];
    $email = $_POST["email"];

    // Conecta no banco de dados
    mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);
    var_dump($conn);

    $result = mysqli_query($conn, "SELECT * FROM Users WHERE cpf='${cpf}' LIMIT 1");
    if (mysqli_num_rows($result) > 0) {
        echo "cpfCadastrado";
        return false;
    }

    $result = mysqli_query($conn, "SELECT * FROM Users WHERE email='${email}' LIMIT 1");
    if (mysqli_num_rows($result) > 0) {
        echo "emailCadastrado";
        return false;
    }

    $result = mysqli_query($conn, "SELECT * FROM Users WHERE user='${user}' LIMIT 1");
    if (mysqli_num_rows($result) > 0) {
        echo "userCadastrado";
        return false;
    }

    echo "submit";
    return false;
?>