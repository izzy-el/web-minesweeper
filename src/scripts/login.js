let xhttp;

function checkFormLogin() {
	const user = document.getElementById("user");
	const pass = document.getElementById("password");

	let elements = [];
	elements.push(user);
	elements.push(pass);

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
						if (resposta == "Logado") {
							window.location.replace("pages/game.html");
						} else {
							alert("Usuário ou senha incorreta.");
						}
					} else {
						alert("Um problema ocorreu.");
					}
				}
			} catch (e) {
				alert("Ocorreu uma exceção: " + e.description);
			}
		};

		xhttp.open("POST", "./resources/login.php", true);

		xhttp.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);

		let params =
			"user=" +
			encodeURIComponent(user.value) +
			"&password=" +
			encodeURIComponent(pass.value);
		xhttp.send(params);
	} catch (e) {
		alert("Ocorreu uma exceção: " + e.description);
	}
}
