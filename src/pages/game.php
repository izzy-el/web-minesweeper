<!DOCTYPE html>
<?php session_start(); 
if (!isset($_SESSION["username"])) {
    header("location: ../index.php");
    exit; 
}
?>

<html lang="pt-br">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="../styles/global.css" />
    <link rel="stylesheet" href="../styles/game.css" />
    <link rel="preconnect" href="https://fonts.googleapis.com" />
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
    <script src="../scripts/script.js" defer></script>
    <link href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins&display=swap" rel="stylesheet" />
    <title>Jogo - Mineles</title>
    <link rel="shortcut icon" href="../assets/favicon.ico" />
</head>

<body>
    <!-- Game Page -->
    <div id="game-page">
        <!-- Top Bar -->
        <header id="top-bar">
            <div class="menu-item">
                <!-- Left Menu -->
                <div id="left-menu">
                    <img src="../assets/menu.png" alt="menu" id="menu-img" class="top-button" />
                </div>
                <ul id="left-item" class="dropdown">
                    <li><a href="./edit-profile.php">Meu Perfil</a></li>
                    <li><a href="../resources/logout.php">Sair</a></li>
                </ul>
            </div>

            <div class="menu-item">
                <!-- Middle Infos -->
                <div id="middle-info">
                    <!-- Normal -->
                    <button id="normal-button" class="middle-button" onclick="changeMode('normal')">
                        Normal
                    </button>

                    <!-- Rivotril -->
                    <button id="rivotril-button" class="middle-button" onclick="changeMode('rivotril')">
                        Rivotril
                    </button>

                    <!-- Timer -->
                    <p id="timer" class="middle-button">
                        <span id="minute">00</span>:<span id="second">00</span>
                    </p>
                </div>
            </div>

            <div>
                <div class="menu-item">
                    <!-- Reset button -->
                    <div class="right-menu">
                        <input type="image" src="../assets/reset.png" alt="reset" id="reset-button" class="top-button" onclick="finalReset()">
                    </div>
                </div>

                <div class="menu-item">
                    <!-- Cheat button -->
                    <div class="right-menu">
                        <input type="image" src="../assets/cheat.png" alt="cheat" id="cheat-button" class="top-button" onclick="activateCheat(3)">
                    </div>
                </div>

                <div class="menu-item">
                    <!-- Settings -->
                    <div class="right-menu">
                        <a href="#popup-settings" onclick="showPopup('popup-settings')"><img src="../assets/settings.png" alt="settings" id="settings-button" class="top-button" /></a>
                    </div>
                </div>
            </div>
        </header>

        <!-- Game -->
        <div id="game-space">
            <div id="game">

            </div>
        </div>
        <div id="game-history">
            <header id="history-title">
                <h2>HISTÓRICO</h2>
                <a href="../pages/global-ranking.php" id="ranking-button">
                    RANKING GLOBAL
                </a>
            </header>

            <div id="scrollable-history">
                <?php include "../resources/get_user_history.php"; ?>
            </div>
        </div>

        <!-- Popup Settings -->
        <div id="popup-settings" class="popup-no-click">
            <div class="popup">
                <!-- Close -->
                <a class="close" href="#">&times;</a>

                <!-- Tamanho -->
                <div class="slider">
                    <p>Tamanho:</p>
                    <input type="range" class="range" min="3" max="20" step="1" name="grid-size" id="grid-size" onchange="updateSlider()" onload="updateSliderValues()" />
                    <p class="bubble" id="size-bubble"></p>
                </div>

                <!-- Numero de bombas -->
                <div class="slider">
                    <p>Bombas:</p>
                    <input type="range" class="range" min="3" max="20" step="1" name="n-bombs" id="n-bombs" onload="updateSliderValues()" />
                    <p class="bubble" id="bomb-bubble"></p>
                </div>

                <!-- Button Aplicar -->
                <button id="button-aplicar" onclick="applySettings()">Aplicar</button>

            </div>
        </div>
        <!-- Popup Win/Loss -->
        <div id="popup-wl" class="popup-no-click">
            <div class="popup-end" id="wl-box">
                <!-- Text Win/Loss -->
                <p id="text-wl"></p>
                <p id="tempo-wl"></p>
                <p id="pontuacao-wl"></p>
                <p id="cells-wl"></p>
                <!-- Button -->
                <button id="button-reiniciar" onclick="finalReset()">Reiniciar</button>
            </div>
        </div>

    </div>
</body>

</html>