function application() {
    function getPairQuestionAnswers(callback) {
        var serverData = [
            {
                id: 0,
                question: '¿Cuáles son los nombres de Estela?',
                answers: [
                    { id: 0, value: 'Estela' },
                    { id: 1, value: 'Rita' },
                    { id: 2, value: 'Todas las anteriores son correctas' },
                ],
                correctAnswer: { id: 2 }
            },
            {
                id: 1,
                question: '¿Cuál es la capital de Zambia?',
                answers: [
                    { id: 0, value: 'Lusaka' },
                    { id: 1, value: 'Harare' },
                    { id: 2, value: 'Madrid' },
                ],
                correctAnswer: { id: 1 }
            },
            {
                id: 2,
                question: '¿Cuál es el nombre completo de Freud?',
                answers: [
                    { id: 0, value: 'Adolf' },
                    { id: 1, value: 'Sefard' },
                    { id: 2, value: 'Sigmund' },
                ],
                correctAnswer: { id: 2 }
            },
            {
                id: 3,
                question: '¿Cuál es el animal más rápido del mundo?',
                answers: [
                    { id: 0, value: 'Guepardo' },
                    { id: 1, value: 'León' },
                    { id: 2, value: 'Tortuga' },
                ],
                correctAnswer: { id: 0 }
            }
        ];
        callback(serverData);
    }

    // variables globales inicialmente asignadas:
    var questions = [];
    var i = 0;
    // variables globales declaradas:
    var answerTime;
    var timerId;
    var seconds;
    // variables identificadoras de elementos de la página:
    var quizQuestion = document.querySelector('.quiz-questions');
    var msg = document.querySelector('.msg');

    // asignación de las preguntas
    getPairQuestionAnswers(function (data) {
        questions = data;
    });


    // temporizador
    function questionTimer() {
        seconds--;
        var timer = document.querySelector('.timer');
        timer.innerHTML = seconds;
        if (seconds === 0) {
            // seconds = 5;
            nextQuestion();
        }
    }

    // calculadora de tiempo de respuesta
    function getAnswerTime() {
        answerTime = 100 - seconds;
        console.log(answerTime);
    }
    // función que pinta la pregunta
    function nextQuestion() {
        msg.innerHTML = '';
        var quizContainer = document.querySelector('.show-quiz');
        var quizAnswers = document.querySelector('.quiz-answers');
        if (i >= questions.length) {
            clearInterval(timerId);
            quizContainer.classList.add('hidden')
                // timer.innerHTML = '';
                ;
        }

        if (i < questions.length) {
            seconds = 5;
            quizQuestion.innerHTML = questions[i].question;
            quizQuestion.setAttribute('id', questions[i].id);
            var answersList = "";
            for (let x = 0; x < questions[i].answers.length; x++) {
                answersList += '<li id="' + x + '" class="li-answers"><input id="' + x + '" type="radio" name="answers"/><label for="' + x + '">' + questions[i].answers[x].value + '</label></li>';
                quizAnswers.innerHTML = answersList;
            }
            i++;
        }

    }

    // función que compara la respuesta
    function checkOption() {
        var currentAnswers = document.getElementsByTagName('input');
        var currentAnswerId;
        var currentQuestionId = quizQuestion.getAttribute('id');

        for (var i = 0; i < currentAnswers.length; i++) {
            if (currentAnswers[i].checked) {
                currentAnswerId = currentAnswers[i].id;
                if (questions[currentQuestionId].correctAnswer.id == currentAnswerId) {
                    msg.innerHTML = '¡Es correcto!';
                } else {
                    msg.innerHTML = '¡Es falso!';

                }
                console.log(currentAnswerId);
                return currentAnswerId;
            };
        }

    }

    // function resetScreenAndShowScores() {
    //     if (que)
    // }

    // función que inicializa
    function start() {
        seconds = '';
        timerId = setInterval(questionTimer, 1000);
        var timer = document.querySelector('.timer');
        timer.innerHTML = '';
        var nextQuestionButton = document.querySelector('.next-question');
        var sendAnswerButton = document.querySelector('.send-answer');
        sendAnswerButton.addEventListener('click', checkOption);
        nextQuestionButton.addEventListener('click', nextQuestion);
    }

    return {
        start: start,
        nextQuestion: nextQuestion,
        questionTimer: questionTimer,
        checkOption: checkOption,
        getAnswerTime: getAnswerTime
    }
}
