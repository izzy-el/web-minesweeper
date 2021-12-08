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
		<link rel="stylesheet" href="../styles/edit-profile.css" />
		<link rel="preconnect" href="https://fonts.googleapis.com" />
		<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
		<script src="../scripts/edit-profile.js"></script>
		<script src="../scripts/signup.js"></script>
		<link
			href="https://fonts.googleapis.com/css2?family=Lato&family=Poppins&display=swap"
			rel="stylesheet"
		/>
		<title>Editar perfil - Mineles</title>
		<link rel="shortcut icon" href="../assets/favicon.ico" />
	</head>
	<body onload="loadData()">
		<!-- Edit Page -->
		<div id="edit-page">
			<!-- Edit -->
			<div id="edit">
				<!-- Edit header -->
				<header id="edit-header">
					<a class="go-back" href="../pages/game.php">
						<img src="../assets/back.png" alt="go-back-arrow" />
					</a>
					<img
						src="../assets/ft-logo.png"
						alt="ft-logo"
						id="ft-logo"
						class="header-logo"
					/>
					<h1>Edição</h1>
					<img
						src="../assets/unicamp-logo.png"
						alt="unicamp-logo"
						id="unicamp-logo"
						class="header-logo"
					/>
				</header>

				<!-- Inputs -->
				<div id="edit-fields">
					<!-- Nome Completo -->
					<input
						type="text"
						placeholder="Nome"
						value=""
						name="name"
						id="name"
						class="field"
					/>
					<!-- Data de nascimento -->
					<input
						type="date"
						onfocus="(this.type='date')"
						value=""
						name="birthday"
						id="birthday"
						class="field"
						disabled
					/>
					<!-- CPF -->
					<input
						type="text"
						placeholder="CPF"
						value=""
						name="cpf"
						id="cpf"
						class="field"
						disabled
					/>
					<!-- Telefone -->
					<input
						type="text"
						placeholder="Telefone"
						value=""
						name="phone"
						id="phone"
						onkeypress="mask(this, mphone);"
						onblur="mask(this, mphone);"
						class="field"
						maxlength="15"
					/>
					<!-- E-mail -->
					<input
						type="text"
						placeholder="E-mail"
						value=""
						name="email"
						id="email"
						class="field"
					/>
					<!-- Nome de usuário -->
					<input
						type="text"
						placeholder="Nome de Usuário"
						value=""
						name="user"
						id="user"
						class="field"
						disabled
					/>
					<!-- Senha Atual -->
					<input
						type="password"
						placeholder="Senha Atual"
						name="actual-password"
						id="actual-password"
						class="field"
					/>
				</div>

				<!-- Buttons -->
				<div id="edit-actions">
					<button id="edit-button" onclick="checkFormEdit()">
						Salvar
					</button>
					<a href="#popup-change-pass" id="change-pass-button">
						Alterar Senha
					</a>
				</div>

				<!-- Popup Alterar senha -->
				<div id="popup-change-pass" class="popup-no-click">
					<div class="popup">
						<!-- Close -->
						<a class="close" href="#">&times;</a>

						<!-- Senha atual -->
						<input
							type="password"
							placeholder="Senha Atual"
							name="actualPassword"
							id="actualPassword"
							class="popup-field"
						/>

						<!-- Nova senha -->
						<input
							type="password"
							placeholder="Nova Senha"
							name="new-password"
							id="new-password"
							class="popup-field"
						/>
						<!-- Confirmação senha -->
						<input
							type="password"
							placeholder="Confirmar Nova Senha"
							name="confirmation-pass"
							id="confirmation-pass"
							class="popup-field"
						/>

						<!-- Button Alterar senha -->
						<button id="button-change" onclick="changePass()">
							Alterar senha
						</button>
					</div>
				</div>
			</div>
		</div>
	</body>
</html>
