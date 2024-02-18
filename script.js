var questions = [
    {
        question: "Com que gênero você se identifica?",
        options: ["Fêmea", "Masculino", "Não binário", "Outros"]
    },
    {
        question: "Qual é a sua faixa etária?",
        options: ["18-24", "25-30", "31-35", "36-40", "41-45", "46-50", "51-55", "56-60", "61-65", "65 ou mais"]
    },
    {
        question: "Você poderia indicar sua etnia?",
        options: ["Branco", "Negro / afro-americano", "Nativo americano / nativo do Alasca", "Asiáticos", "Hispânico ou Latino", "Havaiano nativo / ilhéu do Pacífico", "Outros"]
    },
    {
        question: "Em que país você vive?",
        options: ["Selecione abaixo", "Brasil", "Argentina", "Austrália", "Canadá", "China", "França", "Alemanha", "Índia", "Itália", "Japão", "México", "Rússia", "África do Sul", "Espanha", "Suécia", "Reino Unido", "Estados Unidos", "Outros"]
    },
    {
        question: "Qual é o nível de educação mais alto que você alcançou?",
        options: ["Ensino médio", "Diploma de bacharel", "Mestrado", "PhD"]
    },
    {
        question: "Você está atualmente empregado?",
        options: ["Tempo total", "Meio período ou contrato", "Trabalhadores por conta própria", "Desempregado", "Aluna", "Outros"]
    },
    {
        question: "E na sua área, quantos anos de experiência profissional você possui?",
        options: ["Não tenho experiência profissional", "Menos de 1 ano", "1-2 anos", "3-5 anos", "Mais de 5 anos"]
    }
];

var currentQuestionIndex = 0;
var answers = [];

function showQuestion() {
    var questionContainer = document.getElementById('questionContainer');
    var question = questions[currentQuestionIndex];
    questionContainer.innerHTML = '<h2>' + question.question + '</h2>';

    if (currentQuestionIndex === 3) { // Se a pergunta for "Em que país você vive?"
        var select = document.createElement('select');
        select.id = 'countrySelect';
        select.name = 'options';

        for (var i = 0; i < question.options.length; i++) {
            var option = document.createElement('option');
            option.value = i;
            option.textContent = question.options[i];
            select.appendChild(option);
        }

        questionContainer.appendChild(select);

        if (answers[currentQuestionIndex] !== undefined) {
            document.getElementById('countrySelect').value = answers[currentQuestionIndex];
        }
    } else {
        for (var i = 0; i < question.options.length; i++) {
            var option = document.createElement('input');
            option.type = 'radio';
            option.id = 'option' + i;
            option.name = 'options';
            option.value = i;

            var label = document.createElement('label');
            label.htmlFor = 'option' + i;
            label.textContent = question.options[i];

            questionContainer.appendChild(option);
            questionContainer.appendChild(label);
        }

        if (answers[currentQuestionIndex] !== undefined) {
            document.getElementById('option' + answers[currentQuestionIndex]).checked = true;
        }
    }

    var backButton = document.getElementById('backButton');
    if (currentQuestionIndex > 0) {
        backButton.style.display = 'inline-block';
    } else {
        backButton.style.display = 'none';
    }

    var nextButton = document.getElementById('nextButton');
    if (currentQuestionIndex < questions.length - 1) {
        nextButton.textContent = 'Próximo';
    } else {
        nextButton.textContent = 'Finalizar';
    }
}

document.getElementById('nextButton').addEventListener('click', function() {
    var selectedOption;
    if (currentQuestionIndex === 3) { // Se a pergunta for "Em que país você vive?"
        selectedOption = document.getElementById('countrySelect');
    } else {
        selectedOption = document.querySelector('input[name="options"]:checked');
    }

    if (!selectedOption) {
        document.getElementById('error').textContent = 'Por favor, escolha uma opção.';
        document.getElementById('error').style.display = 'block';
        return;
    } else {
        document.getElementById('error').textContent = '';
        document.getElementById('error').style.display = 'none';
    }

    answers[currentQuestionIndex] = selectedOption.value;

    if (currentQuestionIndex < questions.length - 1) {
        currentQuestionIndex++;
        showQuestion();
    } else {
        document.getElementById('formContainer').style.display = 'none';
        document.getElementById('thanksMessage').style.display = 'block';
        setTimeout(function() {
            document.getElementById('thanksMessage').style.display = 'none';
            document.getElementById('formContainer').style.display = 'block';
            currentQuestionIndex = 0;
            answers = [];
            showQuestion();
        }, 4000);
    }
});

document.getElementById('backButton').addEventListener('click', function() {
    if (currentQuestionIndex > 0) {
        currentQuestionIndex--;
        showQuestion();
    }
});

showQuestion();
