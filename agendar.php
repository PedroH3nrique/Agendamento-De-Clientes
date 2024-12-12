

<!DOCTYPE html>
<html lang="pt-br">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>Agendar Horário</title>

        <style>

            @import url('https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap');


            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
                font-family: 'Poppins', sans-serif;
            }

            html,
            body {
                height: 100%;
            }

            body {
                background-image:linear-gradient(to right, #ffffff, #c9c9c9);
                display: flex;
                align-items: center;
                justify-content: center;
                flex-direction: column;
            }

            p {
                gap: 25px;
                display: flex;
                flex-direction: column;
                align-items: center; /* Corrigido aqui */
                justify-content: center;
            }

            p img{
                width: 150px;
            }

            a{
                margin-top: 30px;
                background-color: red;
                color: white;
                text-decoration: none;
                border-radius: 25px;
                padding: 5px 25px;
            }

        </style>

    </head>
    <body>

        <?php
            // Definir o fuso horário
            date_default_timezone_set('America/Sao_Paulo'); // Ajuste para o seu fuso horário

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
                // Obter os dados do formulário
                $nome_agen = $_POST['nome_agen'];
                $data_agen = $_POST['data_agen'];
                $horario_agen = $_POST['horario_agen'];

                // Combinar data e horário em um único valor DATETIME
                $data_hora_agen = $data_agen . ' ' . $horario_agen;

                // Exibir valores para debug
                //echo "Nome: $nome_agen, Data e Hora: $data_hora_agen<br>";

                // Preparar a query SQL
                $sql = "INSERT INTO Agendamentos (nome_agen, data_agen) VALUES (?, ?)";

                // Preparar a declaração
                $stmt = $conn->prepare($sql);
                $stmt->bind_param("ss", $nome_agen, $data_hora_agen);

                // Executar a declaração
                if ($stmt->execute()) {
                    echo '<p>Treino marcado com Êxito!!!<img src="images/concluido.svg" alt=""></p>';
                    echo '<a href="agendamentos.html">Voltar</a>';
                } else {
                    echo "Erro ao salvar agendamento: " . $stmt->error;
                }

                // Fechar a declaração
                $stmt->close();
            }

            // Fechar a conexão
            $conn->close();
        ?>
        
    </body>
</html>