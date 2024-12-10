<?php 

    $dbHost = 'localhost';
    $dbUsername = 'root';
    $dbPassword = '';
    $dbName = 'agenda';

    $conexao = new mysqli($dbHost, $dbUsername, $dbPassword, $dbName);

    if($conexao->connect_errno){
        echo "Erro: " . $conexao->connect_error; // Mostrando a mensagem de erro
    } else {
        echo "Conexão efetuada com sucesso";
    }

?>