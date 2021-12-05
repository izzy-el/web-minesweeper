<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8" />
        <meta http-equiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link rel="stylesheet" href="styles/global.css" />
        <link rel="stylesheet" href="styles/index.css" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
        <link
        href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins&display=swap"
        rel="stylesheet"
        />
        <title>Acesso - Mineles</title>
        <script src="./scripts/login.js"></script>
        <link rel="shortcut icon" href="assets/favicon.ico" />
    </head>
    <body>
        <!-- Login Page -->
        <div id="login-page">
            <!-- Login -->
            <div id="login">
                <!-- Login header -->
                <header id="login-header">
                    <img
                        src="assets/ft-logo.png"
                        alt="ft-logo"
                        id="ft-logo"
                        class="header-logo"
                    />
                    <h1>Campo Minado</h1>
                    <img
                        src="assets/unicamp-logo.png"
                        alt="unicamp-logo"
                        id="unicamp-logo"
                        class="header-logo"
                    />
                </header>

                <!-- Inputs -->
                <div id="login-fields">
                    <!-- User -->
                    <input
                        type="text"
                        placeholder="Usuário"
                        name="user"
                        id="user"
                        class="field"
                    />
                    <!-- Pass -->
                    <input
                        type="password"
                        placeholder="Senha"
                        name="password"
                        id="password"
                        class="field"
                    />
                </div>

                <!-- Buttons -->
                <div id="login-actions">
                    <!-- <button type="submit" id="login-button">Login</button> -->
                    <!-- <a id="login-button" href="pages/game.html"> Login </a> -->
                    <a id="login-button" onclick="checkFormLogin()"> Login </a>
                    <a id="signup-button" href="pages/signup.html">
                        Cadastrar
                    </a>
                </div>
            </div>
        </div>
    </body>
</html>
