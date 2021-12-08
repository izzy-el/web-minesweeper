<?php

$dbhost = 'localhost:3306';
$dbuser = 'root';
$dbpass = '';
$dbname = 'web_minesweeper';

$_user = $_SESSION["username"];
$_name = $_SESSION["name"];
$_user_id = $_SESSION["id"];

try {
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}

try {
    $query = "SELECT * FROM game WHERE user_id = '$_user_id' ORDER BY date_time DESC";
    $stmt = $conn->query($query);
    if ($stmt->rowCount() >= 1) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $result = $row['result'];
            $bsize = $row['board_size'];
            $nbombs = $row['num_bombs'];
            $gmode = $row['game_mode'];
            $gtime = $row['game_time'];
            $gdate = explode(" ", $row['date_time'])[0];
            $score = $row['score'];
            
            if($result == 1){
                echo '<div class="history-record">';
                echo "<p>$_name</p>";
                echo "<p>$bsize x $bsize</p>";
                echo "<p>$nbombs bombas</p>";
                echo "<p>$gmode</p>";
                echo "<p>$gtime s</p>";
                echo "<p>$gdate</p>";
                echo "<p>$score pontos</p>";
                echo "</div>";
            } 
            else {   
                echo '<div class="history-record" style="background-color: #ff2345" >';
                echo "<p>$_name</p>";
                echo "<p>$bsize x $bsize</p>";
                echo "<p>$nbombs bombas</p>";
                echo "<p>$gmode</p>";
                echo "<p>$gtime s</p>";
                echo "<p>$gdate</p>";
                echo "<p>$score pontos</p>";
                echo "</div>";
            }
        }
    }
    else{
        echo 
        '<p style="text-align: center; margin-top: 7vh; color: rgb(245, 245, 245);">
            Ops, sem registros!
        </p>';
    }
} catch (PDOException $e) {
    echo "Algo deu errado... : " . $e->getMessage();
}
