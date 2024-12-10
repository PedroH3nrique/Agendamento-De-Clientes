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
today.setHours(0, 0, 0, 0); // Zera as horas para comparação correta
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
        currentDate.setHours(0, 0, 0, 0); // Zera as horas para comparação correta

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
    const concluido = document.getElementById('concluido')
    const container = document.getElementsByClassName('container')[0]
    container.style.display = 'flex'
    concluido.style.display = 'none'
    calendario.style.display = 'block'
    confirmacao.style.display = 'none'
    
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
    "05:00", "05:30", "06:00", "06:30",
    "07:00", "07:30",
    "08:00", "08:30", "09:00", "09:30",
    "10:00", "10:30", "11:00", "11:30",
    "12:00", "12:30", "13:00", "13:30",
    "14:00", "14:30", "15:00", "15:30",
    "16:00", "16:30", "17:00", "17:30",
    "18:00", "18:30", "19:00", "19:30",
    "20:00", "20:30", "21:00", "21:30", 
    "22:00", "22:30", "23:00"
];

const timeSlotsContainer = document.getElementById("time-slots");

timeSlots.forEach(time => {
    const timeSlotElement = document.createElement("div");
    timeSlotElement.classList.add("time-slot");
    timeSlotElement.textContent = time;

    timeSlotElement.addEventListener("click", () => {
        // Remove the "selected" class from any previously selected time slot
        const selectedTimeSlot = document.querySelector(".time-slot.selected");
        if (selectedTimeSlot) {
            selectedTimeSlot.classList.remove("selected");
        }

        // Add the "selected" class to the clicked time slot
        timeSlotElement.classList.add("selected");

        const confirmacao = document.getElementById('confirmacao');
        const confirmacaoHorario = document.getElementsByClassName('confirmacaoHorario')[0];
        const calendar = document.getElementsByClassName('calendar')[0];
        const container = document.getElementsByClassName('container')[0]
        container.style.display = 'none'
        calendar.style.display = 'none';
        confirmacao.style.display = 'block';

        const monthName = months[currentMonth]; // Certifique-se de que 'months' e 'currentMonth' estão definidos
        const year = currentYear; // Certifique-se de que 'currentYear' está definido
        const days = selectedDays.join(', '); // Certifique-se de que 'selectedDays' está definido
        confirmacaoHorario.innerHTML = `Treino marcado para o dia <b style="color: #4caf50">${days} de ${monthName} de ${year}</b> às <b style="color: #4caf50">${time}</b>`;
    });

    timeSlotsContainer.appendChild(timeSlotElement);
});

const agendar = document.getElementById('agendar');
agendar.addEventListener("click", () => {
    const nome = document.getElementById('nome')
    const concluido = document.getElementById('concluido');
    concluido.style.display = 'flex';

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

        // Abra a URL em uma nova aba
        window.open(calendarUrl, '_blank');
    }
});