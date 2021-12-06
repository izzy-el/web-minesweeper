<?php
session_start();

$dbhost = 'localhost:3306';
$dbuser = 'root';
$dbpass = '';
$dbname = 'web_minesweeper';

$_user = $_SESSION["username"];

$boardsize = $_POST["boardsize"];
$numbombs = $_POST["numbombs"];
$gamemode = $_POST["gamemode"];
$gametime = $_POST["gametime"];
$datetime = $_POST["datetime"];
$score = $_POST["score"];
$result = $_POST["result"];


// Conecta no banco de dados
try {
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}

// Obtém ID no banco
try {
    $query = "SELECT * FROM users WHERE user = '$_user'";
    $stmt = $conn->query($query);
    if ($stmt->rowCount() >= 1) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $_userID = $row["id"];
        }
    }
} catch (PDOException $e) {
    echo "Algo deu errado... : " . $e->getMessage();
}

// Cadastra o game no banco
try {
    $query = "INSERT INTO game(user_id, board_size, num_bombs, game_mode, game_time, date_time, score, result) VALUES ($_userID, $boardsize, $numbombs, '$gamemode', $gametime, '$datetime', $score, $result)";
    $conn->exec($query);
    echo "done";
    // $stmt = $conn->query($query);
    // if ($stmt->rowCount() >= 1) {

    // }
    exit();
} catch (PDOException $e) {
    echo "Algo deu errado... : " . $e->getMessage();
}
