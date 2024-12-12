<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "agenda";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

if (isset($_POST['id'])) {
    $id = $_POST['id'];
    $sql = "DELETE FROM Agendamentos WHERE pk_cod_agen = ?";
    
    $stmt = $conn->prepare($sql);
    $stmt->bind_param("i", $id);
    
    if ($stmt->execute()) {
        echo "Agendamento excluído com sucesso.";
    } else {
        echo "Erro ao excluir agendamento: " . $conn->error;
    }
    
    $stmt->close();
}

$conn->close();
?>