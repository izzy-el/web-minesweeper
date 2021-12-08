<?php
$dbhost = 'localhost:3306';
$dbuser = 'root';
$dbpass = '';
$dbname = 'web_minesweeper';

$_name = $_SESSION["name"];
$_user_id = $_SESSION["id"];

try {
    $conn = new PDO("mysql:host=$dbhost;dbname=$dbname", $dbuser, $dbpass);
    $conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
} catch (PDOException $e) {
    echo "Connection Failed: " . $e->getMessage();
}

try {
    $query = "SELECT * FROM game AS g LEFT JOIN users as u on u.id = g.user_id where g.result = 1 ORDER BY score DESC LIMIT 10";
    $stmt = $conn->query($query);
    $index = 1;
    if ($stmt->rowCount() >= 1) {
        while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
            $bsize = $row['board_size'];
            $user = $row['user'];
            $nbombs = $row['num_bombs'];
            if($row['game_mode'] == "Rivotril"){
                $gmode = "X";
            }
            else{
                $gmode = "";
            }
            
            $gtime = $row['game_time'];
            $gdate = explode(" ", $row['date_time'])[0];
            $score = $row['score'];

            echo "<tr>";
            echo  "<td>$index</td>";
            echo  "<td>$user</td>";
            echo  "<td>$bsize x $bsize</td>";
            echo  "<td>$gtime</td>";
            echo  "<td>$nbombs</td>";
            echo  "<td>$gmode</td>";
            echo  "<td>$score</td>";
            echo "</tr>";

            $index++;
        }
    }
    else{
        // echo 
        // '<p style="text-align: center; margin-top: 7vh; color: rgb(245, 245, 245);">
        //     Ops, sem registros!
        // </p>';
    }
} catch (PDOException $e) {
    echo "Algo deu errado... : " . $e->getMessage();
}
