<?php
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = 'admin';
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass);

    if(!$conn) {
        die('Could not connect: ' . mysqli_connect_error());
    }

    echo 'Connected succesfully';
    mysqli_close($conn);
?>