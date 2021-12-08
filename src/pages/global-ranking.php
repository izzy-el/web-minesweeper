<!DOCTYPE html>
<?php session_start(); 
if (!isset($_SESSION["username"])) {
    header("location: ../index.php");
    exit; 
}
?>
<html lang="en">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../styles/global.css" />
    <link rel="stylesheet" href="../styles/global-ranking.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins&display=swap" rel="stylesheet" />
    <title>Ranking Global - Mineles</title>
    <link rel="shortcut icon" href="../assets/favicon.ico" />
</head>

<body>
    <header class="ranking-header">
        <h1>Ranking Global</h1>
    </header>
    <a class="go-back" href="game.php">
        <img src="../assets/back.png" alt="go-back-arrow">
    </a>
    <table>
        <tr>
            <th>Posição</th>
            <th>Username</th>
            <th>Tamanho do Tabuleiro</th>
            <th>Tempo</th>
            <th>Número de Bombas</th>
            <th>Rivotril</th>
            <th>Pontuação</th>
        </tr>

        <?php include "../resources/get_global_ranking.php"; ?>

        <!-- <tr>
                <td>1</td>
                <td>JhonesBR</td>
                <td>10x10</td>
                <td>05:49</td>
                <td>82</td>
                <td>X</td>
                <td>12300</td>
               
            </tr>
            <tr>
                <td>2</td>
                <td>Di-santos</td>
                <td>10x10</td>
                <td>04:45</td>
                <td>77</td>
                <td></td>
                <td>7700</td>
            </tr>
            <tr>
                <td>3</td>
                <td>izzy-el</td>
                <td>10x10</td>
                <td>02:04</td>
                <td>71</td>
                <td></td>
                <td>7100</td>     
            </tr>
            <tr>
                <td>4</td>
                <td>LuizOtavios</td>
                <td>8x8</td>
                <td>06:00</td>
                <td>37</td>
                <td>X</td>
                <td>3552</td>  
            </tr>
            <tr>
                <td>5</td>
                <td>Smoow</td>
                <td>7x7</td>
                <td>03:18</td>
                <td>25</td>
                <td>X</td>
                <td>1837</td>  
            </tr>
            <tr>
                <td>6</td>
                <td>geohot</td>
                <td>8x8</td>
                <td>05:09</td>
                <td>27</td>
                <td></td>
                <td>1728</td>
            </tr>
            <tr>
                <td>7</td>
                <td>EsdrasXavier</td>
                <td>6x6</td>
                <td>01:02</td>
                <td>30</td>
                <td>X</td>
                <td>1620</td>
            </tr>
            <tr>
                <td>8</td>
                <td>Blackgale</td>
                <td>5x5</td>
                <td>04:51</td>
                <td>18</td>
                <td>X</td>
                <td>675</td>
            </tr>
            <tr>
                <td>9</td>
                <td>jkube</td>
                <td>5x5</td>
                <td>03:35</td>
                <td>15</td>
                <td>X</td>
                <td>562</td>
            </tr>
            <tr>
                <td>10</td>
                <td>eclipse</td>
                <td>5x5</td>
                <td>03:18</td>
                <td>16</td>
                <td></td>
                <td>400</td>
            </tr> -->
    </table>
</body>

</html>