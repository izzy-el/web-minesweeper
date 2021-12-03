let xhttp;

function checkFormSignup() {
	const mainForm = document.forms["signup-fields"];
	const name = document.getElementById("name");
	const birthday = document.getElementById("birthday");
	const cpf = document.getElementById("cpf");
	const phone = document.getElementById("phone");
	const email = document.getElementById("email");
	const user = document.getElementById("user");
	const pass = document.getElementById("pass");
	const confirmationPass = document.getElementById("confirmation-pass");

	let elements = [];
	elements.push(name);
	elements.push(birthday);
	elements.push(cpf);
	elements.push(phone);
	elements.push(email);
	elements.push(user);
	elements.push(pass);
	elements.push(confirmationPass);

	for (let i = 0; i < elements.length; i++) {
		if (elements[i].value == "") {
			alert("Preencha todos os campos");
			return;
		}
	}

	if (pass.value != confirmationPass.value) {
		pass.focus();
		alert("As senhas não são iguais");
		return;
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
						alert(resposta);
					} else {
						alert("Um problema ocorreu.");
					}
				}
			} catch (e) {
				alert("Ocorreu uma exceção: " + e.description);
			}
		};

		xhttp.open("POST", "../resources/check_av.php", true);

		xhttp.setRequestHeader(
			"Content-Type",
			"application/x-www-form-urlencoded"
		);

		let params = "name="+encodeURIComponent(name.value)+"&birthday="+encodeURIComponent(birthday.value)+"&cpf="+encodeURIComponent(cpf.value)+"&phone="+encodeURIComponent(phone.value)+"&email="+encodeURIComponent(email.value)+"&user="+encodeURIComponent(user.value)+"&password="+encodeURIComponent(pass.value);
		xhttp.send(params);

		if (xhttp.status == 200) {
			let result = xhttp.responseText;
			console.log(result);
			if (result == "cpfCadastrado") {
				// CPF já cadastrado
				window.alert("CPF já cadastrado");
			} else if (result == "emailCadastrado") {
				// E-mail já cadastrado
				window.alert("Email já cadastrado");
			} else if (result == "userCadastrado") {
				// Usuário já cadastrado
				window.alert("Usuário já cadastrado");
			} else if (result == "submit") {
				// Tudo certo
				mainForm.submit();
			}
		} else {
			// alert('Um problema ocorreu.');
		}
	} catch (e) {
		alert("Ocorreu uma exceção: " + e.description);
	}

	// mainForm.submit();
}
