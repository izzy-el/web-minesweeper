let xhttp;

function checkFormEdit() {
	const name = document.getElementById("name");
	const birthday = document.getElementById("birthday");
	const cpf = document.getElementById("cpf");
	const phone = document.getElementById("phone");
	const email = document.getElementById("email");
	const user = document.getElementById("user");
	const actualPassword = document.getElementById("actual-password");

	let elements = [];
	elements.push(name);
	elements.push(birthday);
	elements.push(cpf);
	elements.push(phone);
	elements.push(email);
	elements.push(user);
	elements.push(actualPassword);

	for (let i = 0; i < elements.length; i++) {
		if (elements[i].value == "") {
			alert("Preencha todos os campos");
			return;
		}
	}

	try {
		xhttp = new XMLHttpRequest();

		if (!xhttp) {
			alert("Não foi possível criar um objeto XMLHttpRequest.");
			return false;
		}

		xhttp.onreadystatechange = function () {
			try {
				if (xhttp.readyState === XMLHttpRequest.DONE) {
					if (xhttp.status === 200) {
						let resposta = xhttp.responseText;
						if (resposta == "A senha inserida está incorreta") {
							alert(resposta);
						} else if (resposta == "Dados alterados") {
							actualPassword.value = "";
							window.location.replace("../pages/game.php");
						}
					} else {
						alert("Um problema ocorreu.");
					}
				}
			} catch (e) {
				alert("Ocorreu uma exceção: " + e.description);
			}
		};

		xhttp.open("POST", "../resources/edit_profile.php", true);

		xhttp.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);

		let params =
			"changePass=" +
			encodeURIComponent("false") +
			"&name=" +
			encodeURIComponent(name.value) +
			"&birthday=" +
			encodeURIComponent(birthday.value) +
			"&cpf=" +
			encodeURIComponent(cpf.value) +
			"&phone=" +
			encodeURIComponent(phone.value) +
			"&email=" +
			encodeURIComponent(email.value) +
			"&user=" +
			encodeURIComponent(user.value) +
			"&actualPassword=" +
			encodeURIComponent(actualPassword.value);
		xhttp.send(params);
	} catch (e) {
		alert("Ocorreu uma exceção: " + e.description);
	}
}

function loadData() {
	const name = document.getElementById("name");
	const birthday = document.getElementById("birthday");
	const cpf = document.getElementById("cpf");
	const phone = document.getElementById("phone");
	const email = document.getElementById("email");
	const user = document.getElementById("user");
	const actualPassword = document.getElementById("actual-password");

	try {
		xhttp = new XMLHttpRequest();

		if (!xhttp) {
			alert("Não foi possível criar um objeto XMLHttpRequest.");
			return false;
		}

		xhttp.onreadystatechange = function () {
			try {
				if (xhttp.readyState === XMLHttpRequest.DONE) {
					if (xhttp.status === 200) {
						let resposta = JSON.parse(xhttp.responseText);

						name.value = resposta["name"];
						birthday.value = resposta["birthday"].substring(0, 10);
						cpf.value = resposta["cpf"];
						phone.value = resposta["phone"];
						email.value = resposta["email"];
						user.value = resposta["user"];
					} else {
						alert("Um problema ocorreu.");
					}
				}
			} catch (e) {
				alert("Ocorreu uma exceção: " + e.description);
			}
		};

		xhttp.open("POST", "../resources/get_user_data.php", true);

		xhttp.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);

		xhttp.send();
	} catch (e) {
		alert("Ocorreu uma exceção: " + e.description);
	}
}

function changePass() {
	const actualPassword = document.getElementById("actualPassword");
	const password = document.getElementById("new-password");
	const confirmationPassword = document.getElementById("confirmation-pass");

	if (password.value == confirmationPassword.value) {
		try {
			xhttp = new XMLHttpRequest();

			if (!xhttp) {
				alert("Não foi possível criar um objeto XMLHttpRequest.");
				return false;
			}

			xhttp.onreadystatechange = function () {
				try {
					if (xhttp.readyState === XMLHttpRequest.DONE) {
						if (xhttp.status === 200) {
							let resposta = xhttp.responseText;
							alert(resposta);
							window.location.replace("../pages/game.php");
						} else {
							alert("Um problema ocorreu.");
						}
					}
				} catch (e) {
					alert("Ocorreu uma exceção: " + e.description);
				}
			};

			xhttp.open("POST", "../resources/edit_profile.php", true);

			xhttp.setRequestHeader(
				"Content-Type",
				"application/x-www-form-urlencoded"
			);

			let params =
				"changePass=" +
				encodeURIComponent("true") +
				"&pass=" +
				encodeURIComponent(actualPassword.value) +
				"&newPass=" +
				encodeURIComponent(password.value);
			xhttp.send(params);
		} catch (e) {
			alert("Ocorreu uma exceção: " + e.description);
		}
	} else {
		alert("As senhas não são iguais");
	}
}
