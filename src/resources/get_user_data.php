<?php
session_start();

$_return = array(
    "name" => $_SESSION["name"],
    "birthday" => $_SESSION["birthday"],
    "cpf" => $_SESSION["cpf"],
    "phone" => $_SESSION["phone"],
    "email" => $_SESSION["email"],
    "user" => $_SESSION["username"],
);

echo json_encode($_return);
