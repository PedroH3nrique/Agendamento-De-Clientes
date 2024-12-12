<?php
// Conexão com o banco de dados
$servername = "localhost"; // ou o endereço do seu servidor
$username = "root";
$password = "";
$dbname = "agenda";

$conn = new mysqli($servername, $username, $password, $dbname);

// Verifica a conexão
if ($conn->connect_error) {
    die("Conexão falhou: " . $conn->connect_error);
}

// Consulta para buscar os agendamentos
$sql = "SELECT pk_cod_agen, nome_agen, DATE_FORMAT(data_agen, '%d/%m/%Y') as data, DATE_FORMAT(data_agen, '%H:%i') as hora FROM Agendamentos";
$result = $conn->query($sql);
?>

<!DOCTYPE html>
<html lang="pt-br">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="css/admin.css">
    <title>Página do Administrador</title>
</head>
<body>

    <a href="login.html" id="sair">Sair</a>

    <table>
        <thead>
            <tr>
                <th>Nome:</th>
                <th>Data:</th>
                <th>Horário:</th>
            </tr>
        </thead>
        <tbody>
            <?php
            if ($result->num_rows > 0) {
                // Saída de cada linha
                while($row = $result->fetch_assoc()) {
                    echo "<tr data-id='" . $row["pk_cod_agen"] . "'>
                            <td>" . $row["nome_agen"] . "</td>
                            <td>" . $row["data"] . "</td>
                            <td>" . $row["hora"] . "</td>
                          </tr>";
                }
            } else {
                echo "<tr><td colspan='3'>Nenhum agendamento encontrado</td></tr>";
            }
            ?>
        </tbody>
    </table>

    <div class="detalhesHorarios" style="display: none;">
        <button class="exit">
            <img src="images/exit.svg" alt="">
        </button>
        <p class="nomeDetalhe"></p>
        <p class="dataDetalhe"></p>
        <p class="horaDetalhe"></p>
        <button id="apagarAgendamento">Apagar agendamento</button>
    </div>

    <script>
        const exitButton = document.getElementsByClassName('exit')[0];
        const celulas = document.querySelectorAll('td');
        const detalhesHorarios = document.getElementsByClassName('detalhesHorarios')[0];
        const nomeDetalhe = document.querySelector('.nomeDetalhe');
        const dataDetalhe = document.querySelector('.dataDetalhe');
        const horaDetalhe = document.querySelector('.horaDetalhe');

        celulas.forEach(celula => {
            celula.addEventListener("click", () => {
                const linha = celula.parentElement;
                const nome = linha.children[0].textContent;
                const data = linha.children[1].textContent;
                const hora = linha.children[2].textContent;

                nomeDetalhe.textContent = nome;
                dataDetalhe.textContent = data;
                horaDetalhe.textContent = hora;

                detalhesHorarios.style.display = 'flex';
                detalhesHorarios.setAttribute('data-id', linha.getAttribute('data-id')); // Armazena o ID do agendamento
            });
        });

        exitButton.addEventListener("click", () => {
            detalhesHorarios.style.display = 'none';
        });

        document.getElementById('apagarAgendamento').addEventListener('click', () => {
            const id = detalhesHorarios.getAttribute('data-id');

            if (confirm("Tem certeza que deseja apagar este agendamento?")) {
                fetch('delete_agendamento.php', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: 'id=' + id
                })
                .then(response => response.text())
                .then(data => {
                    alert(data);
                    location.reload(); // Recarrega a página para atualizar a tabela
                })
                .catch(error => console.error('Erro:', error));
            }
        });
    </script>
    
</body>
</html>

<?php
$conn->close(); // Fecha a conexão
?>