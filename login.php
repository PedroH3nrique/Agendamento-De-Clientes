<?php
// Conexão com o banco de dados
$servername = "localhost"; // ou o endereço do seu servidor
$username = "root"; // seu usuário do banco de dados
$password = ""; // sua senha do banco de dados
$dbname = "agenda"; // nome do seu banco de dados

// Criar conexão
$conn = new mysqli($servername, $username, $password, $dbname);

// Verificar conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Verificar se o formulário foi enviado
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $nome = $_POST['nome'];
    $senha = $_POST['senha'];

    // Prepara a consulta SQL
    $sql = "SELECT * FROM admin WHERE nome_admin = ? AND senha_admin = ?";
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("ss", $nome, $senha);
    $stmt->execute();
    $result = $stmt->get_result();

    // Verifica se o usuário existe
    if ($result->num_rows > 0) {
        // Login bem-sucedido
        echo "Login bem-sucedido! Bem-vindo, " . htmlspecialchars($nome) . "!";
        // Aqui você pode redirecionar para outra página ou iniciar uma sessão
        header('Location: admin_page.php');
    } else {
        // Login falhou
        echo "Nome ou senha incorretos.";
    }

    // Fecha a declaração e a conexão
    $stmt->close();
}

$conn->close();
?>