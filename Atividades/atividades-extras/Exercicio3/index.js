// Define a variável global para armazenar o intervalo da contagem regressiva
let countdownInterval;

// Função para iniciar ou parar a contagem regressiva
function startStopCountdown() {
    // Verifica se a contagem regressiva está ativa
    if (countdownInterval) {
        // Se estiver ativa, para a contagem
        clearInterval(countdownInterval);
        countdownInterval = null;
    } else {
        // Se não estiver ativa, inicia a contagem regressiva
        startCountdown();
    }
}

// Função para iniciar a contagem regressiva
function startCountdown() {
    // Obtém a data atual
    const now = new Date().getTime();

    // Define a quantidade de tempo desejada em milissegundos (por exemplo, 1 hora)
    const timeToAdd = 1 * 60 * 60 * 1000; // 1 hora neste exemplo

    // Calcula a data alvo adicionando o tempo desejado à data atual
    const countDownDate = now + timeToAdd;

    // Atualiza o contador a cada 1 segundo
    countdownInterval = setInterval(function () {
        // Encontra o horário atual
        let currentTime = new Date().getTime();

        // Encontra a distância entre as datas
        let distance = countDownDate - currentTime;

        if (distance > 0) {
            // Calcula os dias/horas/minutos/segundos
            let days = Math.floor(distance / (1000 * 60 * 60 * 24));
            let hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
            let minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
            let seconds = Math.floor((distance % (1000 * 60)) / 1000);

            // Insere as variáveis no HTML (usando os IDs fornecidos no HTML)
            document.getElementById("countdown-day").innerText = days;
            document.getElementById("countdown-hours").innerText = hours;
            document.getElementById("countdown-minutes").innerText = minutes;
            document.getElementById("countdown-seconds").innerText = seconds;
        } else {
            // Quando a contagem regressiva chegar a zero, exibe uma mensagem ou executa ação desejada
            document.getElementById("countdown-day").innerText = "0";
            document.getElementById("countdown-hours").innerText = "0";
            document.getElementById("countdown-minutes").innerText = "0";
            document.getElementById("countdown-seconds").innerText = "0";

            // Você pode adicionar código aqui para o que deseja fazer após a contagem regressiva terminar

            // Limpa o intervalo para parar a contagem regressiva
            clearInterval(countdownInterval);
            countdownInterval = null;
        }
    }, 1000);
}

// Função para parar a contagem regressiva
function stopCountdown() {
    // Para a contagem regressiva se estiver ativa
    if (countdownInterval) {
        clearInterval(countdownInterval);
        countdownInterval = null;
    }
}
