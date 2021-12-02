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


    if (pass.value != confirmationPass.value) {
        pass.focus();
        alert("As senhas não são iguais");
        return;
    }
    
    // $.post("check_av.php", {cpf:cpf , email:email, user:user},  
    //     function(result) {  
    //         if (result == "cpfCadastrado") {
    //             // CPF já cadastrado
    //             window.alert("CPF já cadastrado");
    //         } else if (result == "emailCadastrado") {
    //             // E-mail já cadastrado
    //             window.alert("Email já cadastrado");
    //         } else if (result == "userCadastrado") {
    //             // Usuário já cadastrado
    //             window.alert("Usuário já cadastrado");
    //         } else {
    //             // Tudo certo
    //             mainForm.submit();
    //         }
    //     }
    // );

    try {
        let xhttp = new XMLHttpRequest();

        console.log(xhttp);

        if (!xhttp) {
            alert('Não foi possível criar um objeto XMLHttpRequest.');
            return false;
        }

        xhttp.open('POST', '../resources/check_av.php', true);
        xhttp.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        let params = "cpf="+encodeURIComponent(cpf.value)+"&email="+encodeURIComponent(email.value)+"&user="+encodeURIComponent(user.value);
        xhttp.send(params);

        console.log(params);

        if (xhttp.readyState === XMLHttpRequest.DONE) {
            if (xhttp.status === 200) {
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
                } else if (result == "submit"){
                    // Tudo certo
                    mainForm.submit();
                }
            }
            else {
                alert('Um problema ocorreu.');
            }
        }
    } catch (e) {
        alert("Ocorreu uma exceção: " + e.description);
    }
    
    // mainForm.submit();
}