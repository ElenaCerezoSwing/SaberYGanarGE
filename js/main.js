function getPairQuestionAnswers(callback) {
    var serverData = [
        {
            id: 1,
            question: '¿Cuáles son los nombres de Estela?',
            answers: [
                { id: 1, value: 'Estela' },
                { id: 2, value: 'Rita' },
                { id: 3, value: 'Todas las anteriores son correctas' },
            ],
            correctAnswer: { id: 3 }
        },
        {
            id: 2,
            question: '¿Cuál es la capital de Zambia?',
            answers: [
                { id: 1, value: 'Lusaka' },
                { id: 2, value: 'Harare' },
                { id: 3, value: 'Madrid' },
            ],
            correctAnswer: { id: 2 }
        },
        {
            id: 3,
            question: '¿Cuál es el nombre completo de Freud?',
            answers: [
                { id: 1, value: 'Adolf' },
                { id: 2, value: 'Sefard' },
                { id: 3, value: 'Sigmund' },
            ],
            correctAnswer: { id: 3 }
        },
        {
            id: 4,
            question: '¿Cuál es el animal más rápido del mundo?',
            answers: [
                { id: 1, value: 'Guepardo' },
                { id: 2, value: 'León' },
                { id: 3, value: 'Tortuga' },
            ],
            correctAnswer: { id: 1 }
        }

    ];
    callback(serverData);
}

var questions = [];
getPairQuestionAnswers(function (data) {
    questions = data;
});

var quizContainer = document.querySelector('.show-quiz');
var quizQuestion = document.querySelector('.quiz-questions');
var quizAnswers = document.querySelector('.quiz-answers');
var nextQuestionButton = document.querySelector('.next-question');

var i = 0;

function nextQuestion() {
    if (i < questions.length) {
        quizQuestion.innerHTML = questions[i].question;
        var answersList = "";
        for (let x = 0; x < questions[i].answers.length; x++) {
            answersList += '<li class="li-answers"><input id="' + x + '" type="radio"/><label name="' + x + '">' + questions[i].answers[x].value + '</label></li>';
            quizAnswers.innerHTML = answersList;
        }
        i++;
    }
}

nextQuestionButton.addEventListener('click', nextQuestion);




