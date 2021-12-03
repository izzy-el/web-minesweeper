<?php
    $dbhost = 'localhost:3306';
    $dbuser = 'root';
    $dbpass = '';
    $dbname = 'web_minesweeper';
    
    // Create database
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass);
    try {
        $sql = "DROP DATABASE $dbname;";
        mysqli_query($conn, $sql);
    } catch (Exception $e) {
        echo $e;
    } finally {
        $sql = "CREATE DATABASE $dbname";
        mysqli_query($conn, $sql);

        echo "Created database <br>";
        mysqli_close($conn);
    }

    // Opening the connection and specifying the DB we will be using
    $conn = mysqli_connect($dbhost, $dbuser, $dbpass, $dbname);

    if(!$conn) {
        die('Could not connect: ' . mysqli_connect_error());
    }

    echo 'Connected succesfully <br>';

    try {
        $sql = "DROP TABLE Game;";
        mysqli_query($conn, $sql);

        $sql = "DROP TABLE Users;";
        mysqli_query($conn, $sql);
    } catch (Exception $e) {
        echo $e;
    } finally {
        $sql = "CREATE TABLE Users(
                    id INTEGER NOT NULL AUTO_INCREMENT,
                    name CHAR(50) NOT NULL,
                    birthday DATETIME NOT NULL,
                    cpf CHAR(11) NOT NULL UNIQUE,
                    phone CHAR(11) NOT NULL,
                    email CHAR(50) NOT NULL UNIQUE,
                    user CHAR(20) NOT NULL UNIQUE,
                    password CHAR(60) NOT NULL,
                    PRIMARY KEY (id)
                );";
        mysqli_query($conn, $sql);
        echo "Table Users created <br>";

        $sql = "CREATE TABLE Game(
                    id INTEGER NOT NULL AUTO_INCREMENT,
                    user_id INTEGER NOT NULL,
                    board_size INTEGER NOT NULL,
                    num_bombs INTEGER NOT NULL,
                    game_mode CHAR(10) NOT NULL,
                    game_time INT NOT NULL,
                    date_time DATETIME NOT NULL,
                    score INT NOT NULL,
                    PRIMARY KEY (id),
                    FOREIGN KEY (user_id) REFERENCES Users(id)
                )";
        mysqli_query($conn, $sql);
        echo "Table Game created <br>";
    }

    mysqli_close($conn);
?>