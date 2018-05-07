function getPairQuestionAnswers(callback) {
    var serverData = [
        {
            id: 1,
            question: '¿Cuáles son los nombres de Estela?',
            answers: [
                { id: 1, value: 'Estela' },
                { id: 2, value: 'Rita' },
                { id: 1, value: 'Todas las anteriores son correctas' },
            ],
            correctAnswer: { id: 3 }
        },
        {
            id: 2,
            question: '¿Cuál es la capital de Zambia?',
            answers: [
                { id: 1, value: 'Lusaka' },
                { id: 2, value: 'Harare' },
                { id: 1, value: 'Madrid' },
            ],
            correctAnswer: { id: 2 }
        },
        {
            id: 3,
            question: '¿Cuál es el nombre completo de Freud?',
            answers: [
                { id: 1, value: 'Adolf' },
                { id: 2, value: 'Sefard' },
                { id: 1, value: 'Sigmund' },
            ],
            correctAnswer: { id: 3 }
        },
        {
            id: 4,
            question: '¿Cuál es el animal más rápido del mundo?',
            answers: [
                { id: 1, value: 'Guepardo' },
                { id: 2, value: 'León' },
                { id: 1, value: 'Tortuga' },
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

function nextPairQuestionAnswer() {
    for (let i = 0; i < questions.length; i++) {
        quizQuestion.innerHTML = questions[i].question;
        for (let k = 0; k < questions[i].answers.length; k++) {
            quizAnswers.innerHTML = '<li>' + questions[i].answers[k].value + '</li>';
        };
    };
}

nextQuestionButton.addEventListener('click', nextPairQuestionAnswer);




// for (let i = 0; i < questions.length; i++) {
//     setTimeout(function (y) {
//         console.log(questions[y].question);
//         console.log(questions[y].answers[0].value);
//         console.log(questions[y].answers[1].value);
//         console.log(questions[y].answers[2].value);
//     }, i * 5000, i);
// };


// for (let i = questions.length; i > 0; i--) {
//     setTimeout(function (k) {
//         console.clear(questions[k].question);
//         console.clear(questions[k].answers[0].value);
//         console.clear(questions[k].answers[1].value);
//         console.clear(questions[k].answers[2].value);

//     }, i * 5500, i);
// };