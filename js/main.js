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

    var questions = [];
    var i = 0;
    var initialTime = 20;
    var scorePoints = 0;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var answerTime;
    var timerId;
    var seconds;
    var quizQuestion = document.querySelector('.quiz-questions');
    var msg = document.querySelector('.msg');
    var rightAnswersStatistics = document.querySelector('.correct-answer');
    var wrongAnswersStatistics = document.querySelector('.failed-answer');
    var averageSpeedStatistics = document.querySelector('.statistics-time');

    getPairQuestionAnswers(function (data) {
        questions = data;
    });


    function questionTimer() {
        seconds--;
        var timer = document.querySelector('.timer');
        timer.innerHTML = seconds;
        if (seconds === 0) {
            nextQuestion();
        }
    }

    function getAnswerTime() {
        answerTime = 100 - seconds;
        console.log(answerTime);
    }
    function nextQuestion() {
        msg.innerHTML = '';
        var quizContainer = document.querySelector('.show-quiz');
        var quizAnswers = document.querySelector('.quiz-answers');
        if (i >= questions.length) {
            clearInterval(timerId);
            quizContainer.classList.add('hidden');
        }

        if (i < questions.length) {
            seconds = initialTime;
            quizQuestion.innerHTML = questions[i].question;
            quizQuestion.setAttribute('data-id', questions[i].id);
            var answersList = "";
            for (let x = 0; x < questions[i].answers.length; x++) {
                answersList += '<li id="' + x + '" class="li-answers"><input id="' + x + '" type="radio" name="answers"/><label for="' + x + '">' + questions[i].answers[x].value + '</label></li>';
                quizAnswers.innerHTML = answersList;
            }
            i++;
        }

    }

    function checkOption() {
        var currentAnswers = document.getElementsByTagName('input');
        var currentAnswerId;
        var currentQuestionId = quizQuestion.getAttribute('data-id');

        for (var i = 0; i < currentAnswers.length; i++) {
            answerTime = initialTime - seconds;
            if (currentAnswers[i].checked) {
                currentAnswerId = currentAnswers[i].id;
                if (questions[currentQuestionId].correctAnswer.id == currentAnswerId) {
                    msg.innerHTML = '¡Es correcto!';
                    rightAnswers += 1;
                    answerTime = initialTime - seconds;
                    if (answerTime <= 2) {
                        scorePoints += 2;
                    }
                    if (answerTime > 2 && answerTime <= 10) {
                        scorePoints += 1;
                    }
                    if (answerTime > 10 && answerTime < 20) {
                        scorePoints += 0;
                    }

                } else {
                    msg.innerHTML = '¡Es falso!';
                    wrongAnswers += 1;
                    if (answerTime <= 10) {
                        scorePoints -= 1;
                    }
                    if (answerTime > 10 && answerTime <= 20) {
                        scorePoints -= 2;
                    }
                }
                rightAnswersStatistics.innerHTML = rightAnswers;
                wrongAnswersStatistics.innerHTML = wrongAnswers;
                averageSpeedStatistics.innerHTML = averageSpeed();


                console.log(answerTime);
                console.log(currentAnswerId);
                console.log(scorePoints);

                return currentAnswerId;

            };
        }

    }

    function averageSpeed() {
        var counter = 0;
        counter += answerTime;
        var averageSpeedResult = (counter / (questions.length + 1))
        return averageSpeedResult;
    }

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
