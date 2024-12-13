//document.querySelector('input[name="fk_cod_agen_uso"]').value = localStorage.getItem('user_id');


const daysContainer = document.getElementById('days');
const monthYear = document.getElementById('month-year');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const resultDia = document.querySelector('.resultDia'); // Seleciona o elemento para mostrar os dias

const months = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
];

var currentMonth = new Date().getMonth();
var currentYear = new Date().getFullYear();
var today = new Date(); // Data atual
today.setHours(0, 0, 0, 0); 
var selectedDays = []; // Array para armazenar os dias selecionados

function renderCalendar(month, year) {
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    daysContainer.innerHTML = '';
    monthYear.textContent = `${months[month]} ${year}`;

    // Preenchimento vazio antes do primeiro dia do mês
    for (var i = 0; i < firstDay; i++) {
        const emptySpan = document.createElement('span');
        daysContainer.appendChild(emptySpan);
    }

    // Preenche os dias do mês
    for (let day = 1; day <= daysInMonth; day++) {
        const daySpan = document.createElement('span');
        daySpan.textContent = day;

        const currentDate = new Date(year, month, day);
        currentDate.setHours(0, 0, 0, 0); 

        // Verifica se o dia é passado
        if (currentDate < today) {
            daySpan.classList.add('disabled');
        } else {
            daySpan.classList.add('selectable');
            daySpan.addEventListener('click', () => {
                // Se já houver um dia selecionado, desmarque-o
                if (selectedDays.length > 0) {
                    const previouslySelectedSpan = daysContainer.querySelector(`span.selected`);
                    if (previouslySelectedSpan) {
                        previouslySelectedSpan.classList.remove('selected'); // Remove a classe do dia anteriormente selecionado
                    }
                    selectedDays = []; // Limpa o array de dias selecionados
                }
            
                // Seleciona o novo dia
                daySpan.classList.add('selected');
                selectedDays.push(day); // Adiciona o novo dia ao array
            
                const timeSlotsContainer = document.getElementById("time-slots");
                timeSlotsContainer.style.display = 'block'; // Mostra o contêiner de horários
                resultDia.innerHTML = `Selecione um horário para o dia <b style="color: #4caf50">${day} de ${months[month]} de ${year}.</b>`;
            });
        }

        // Destaca o dia atual
        if (currentDate.toDateString() === today.toDateString()) {
            daySpan.classList.add('today'); // Adiciona uma classe para o dia atual
        }

        daysContainer.appendChild(daySpan);
    }
}

prevButton.addEventListener('click', () => {
    currentMonth--;

    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar(currentMonth, currentYear);
});

nextButton.addEventListener('click', () => {
    currentMonth++;

    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar(currentMonth, currentYear);
});

// Renderiza o calendário inicial
renderCalendar(currentMonth, currentYear);


function fechar(){
    const calendario = document.getElementsByClassName('calendar')[0]
    const exitBtn = document.getElementById('exit')
    const confirmacao = document.getElementById('confirmacao')
    const container = document.getElementsByClassName('container')[0]

    container.style.display = 'flex'
    calendario.style.display = 'block'
    confirmacao.style.display = 'none'
    
    location.reload(true);
}

function verSenha() {
    const senha = document.getElementById('senha');
    const img = document.getElementById('imgOlho')

    if (senha) {
        if (senha.type === 'password') {
            senha.type = 'text';
            img.src = 'images/naoVendoSenha.svg'

        } else {
            img.src = 'images/vendoSenha.svg'
            senha.type = 'password';
        }
    }
}


const timeSlots = [
    "05:00", "05:50",
    "06:40", "07:30",
    "08:20", "09:10",
    "10:00", "10:50",
    "11:40", "12:30",
    "13:20", "14:10",
    "15:00", "15:50",
    "16:40", "17:30",
    "18:20", "19:10",
    "20:00", "20:50",
    "21:40", "22:30"
];


const timeSlotsContainer = document.getElementById("time-slots");

timeSlots.forEach(time => {
    const timeSlotElement = document.createElement("div");
    timeSlotElement.classList.add("time-slot");
    timeSlotElement.textContent = time;

    timeSlotElement.addEventListener("click", () => {
        // Remove a classe "selected" de qualquer horário previamente selecionado
        const selectedTimeSlot = document.querySelector(".time-slot.selected");
        if (selectedTimeSlot) {
            selectedTimeSlot.classList.remove("selected");
        }
    
        // Adiciona a classe "selected" ao horário clicado
        timeSlotElement.classList.add("selected");
    
        const confirmacao = document.getElementById('confirmacao');
        const data = document.getElementsByClassName('data')[0];
        const horas = document.getElementsByClassName('horas')[0];
        const calendar = document.getElementsByClassName('calendar')[0];
        const container = document.getElementsByClassName('container')[0];
        container.style.display = 'none';
        calendar.style.display = 'none';
        confirmacao.style.display = 'block';
    
        const monthName = months[currentMonth]; // Nome do mês
        const year = currentYear; // Ano
        const days = selectedDays.join(', '); // Dias selecionados
        const selectedTime = time; // Horário selecionado
    
        // Atualiza os elementos <p> com os dados
        data.innerHTML = `Data: <b style="color: #4caf50">${days}</b> de <b style="color: #4caf50">${monthName}</b> de <b style="color: #4caf50">${year}</b>`;
        horas.innerHTML = `Horário: <b style="color: #4caf50">${selectedTime}</b>`;
    
        // Preenche os campos ocultos com os dados
        document.querySelector('input[name="data_agen"]').value = `${year}-${currentMonth + 1}-${selectedDays[0]}`; // Formato YYYY-MM-DD
        document.querySelector('input[name="horario_agen"]').value = selectedTime; // Horário selecionado
    });

    timeSlotsContainer.appendChild(timeSlotElement);
});

const agendar = document.getElementById('agendar');
const nome = document.getElementById('nome');

agendar.addEventListener("click", (event) => {
    event.preventDefault(); // Impede o envio padrão do formulário

    // Verifica se o campo nome está vazio
    if (nome.value.trim().length === 0) {
        alert("Por favor, insira um nome."); // Mensagem de erro
        return; // Impede a execução do restante do código
    }

    // Obtenha o dia, mês e ano selecionados
    const selectedDay = selectedDays[0]; // Supondo que apenas um dia é selecionado
    const month = currentMonth + 1; // Adiciona 1 porque os meses começam em 0
    const year = currentYear;

    // Obtenha o horário selecionado
    const selectedTimeSlot = document.querySelector(".time-slot.selected");
    const time = selectedTimeSlot ? selectedTimeSlot.textContent : null;

    if (time) {
        // Construa a data e hora de início e fim
        const startDate = new Date(year, currentMonth, selectedDay, parseInt(time.split(':')[0]), parseInt(time.split(':')[1]));
        const endDate = new Date(startDate);
        endDate.setHours(endDate.getHours() + 1); // Define a duração do evento como 1 hora

        // Formate as datas para o formato necessário
        const startDateString = startDate.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, 15) + "Z"; // YYYYMMDDTHHMMSSZ
        const endDateString = endDate.toISOString().replace(/-|:|\.\d{3}/g, "").slice(0, 15) + "Z"; // YYYYMMDDTHHMMSSZ

        // Título e descrição do evento
        const title = "Treino com o Personal Donizete"; // Você pode personalizar isso
        const description = `Agendamento de treino para ${nome.value} no StudioBox do personal Donizete`; // Você pode personalizar isso

        // Construa a URL do Google Calendar
        const calendarUrl = `https://calendar.google.com/calendar/render?action=TEMPLATE&text=${encodeURIComponent(title)}&dates=${startDateString}/${endDateString}&details=${encodeURIComponent(description)}`;

        // Adiciona um campo oculto ao formulário para enviar a data
        /*const hiddenInput = document.createElement('input');
        hiddenInput.type = 'hidden';
        hiddenInput.name = 'data_agen';
        hiddenInput.value = startDate.toISOString(); // Formato ISO para o banco de dados
        document.querySelector('form').appendChild(hiddenInput);*/

        // Abra a URL em uma nova aba
        window.open(calendarUrl, '_blank');

        // Agora você pode submeter o formulário
        document.querySelector('form').submit();
    }
});