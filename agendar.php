<?php
// Conexão com o banco de dados
$servername = "localhost"; // ou o endereço do seu servidor
$username = "admin";
$password = "";
$dbname = "agenda";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verifica se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome_agen = $_POST['nome_agen'];
    $data_agen = $_POST['data_agen']; // Você deve enviar isso do JavaScript

    // Prepara e vincula
    $stmt = $conn->prepare("INSERT INTO Agendamentos (nome_agen, data_agen) VALUES (?, ?)");
    $stmt->bind_param("ss", $nome_agen, $data_agen);

    // Executa a consulta
    if ($stmt->execute()) {
        echo "Agendamento realizado com sucesso!";
    } else {
        echo "Erro: " . $stmt->error;
    }

    // Fecha a declaração e a conexão
    $stmt->close();
}

$conn->close();
?>