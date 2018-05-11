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
    var questionsIndex = -1;
    var initialTime = 20;
    var scorePoints = 0;
    var rightAnswers = 0;
    var wrongAnswers = 0;
    var answerTime;
    var timerId;
    var seconds;
    var timer;
    var quizQuestion = document.querySelector('.quiz-questions');
    var msg = document.querySelector('.msg');
    var rightAnswersStatistics = document.querySelector('.correct-answer');
    var wrongAnswersStatistics = document.querySelector('.failed-answer');
    var averageSpeedStatistics = document.querySelector('.statistics-time');
    var mainWrapper = document.querySelector('.wrapper');
    var playGameButton = document.getElementById('play-game-button');



    function start() {
        getPairQuestionAnswers(function (data) {
            questions = data;
        });

        seconds = '';
        timer = document.querySelector('.timer');
        timer.innerHTML = '';
        var nextQuestionButton = document.querySelector('.next-question');
        var sendAnswerButton = document.querySelector('.send-answer');
        sendAnswerButton.addEventListener('click', checkOption);
        nextQuestionButton.addEventListener('click', onNextQuestion);
        playGameButton.addEventListener('click', onStartGame);


    }

    function onStartGame() {
        mainWrapper.classList.remove('hidden');
        playGameButton.classList.add('hidden');
        startTimer();
        timerId = setInterval(function () {
            seconds--;
            if (seconds > 0) {
                renderTime();
            }

            else if (seconds === 0) {
                onTimeOut();
            }
        }, 1000);
        onNextQuestion();
    }
    function startTimer() {
        seconds = 20;
    }

    function resetCountDown() {
        clearInterval(timerId);
        seconds = 20;
    }

    function renderTime() {
        timer.innerHTML = seconds;
    }


    function onTimeOut() {
        onNextQuestion();
        if (questionsIndex > questions.length) {
            quizContainer.classList.add('hidden');
            clearInterval(timerId);
        }
    }

    function getAnswerTime() {
        answerTime = 20 - seconds;
        console.log(answerTime);
    }

    function onNextQuestion() {
        startTimer();
        questionsIndex++;
        renderQuestion(questions[questionsIndex]);

    }


    function renderQuestion(question) {
        resetMessage();
        var quizContainer = document.querySelector('.show-quiz');
        var quizAnswers = document.querySelector('.quiz-answers');
        if (questionsIndex >= questions.length) {
            quizContainer.classList.add('hidden');
        }

        if (questionsIndex < questions.length) {
            quizQuestion.innerHTML = question.question;
            quizQuestion.setAttribute('data-id', question.id);
            var answersList = "";
            for (let x = 0; x < question.answers.length; x++) {
                answersList += '<li id="' + x + '" class="li-answers"><input id="' + x + '" type="radio" name="answers"/><label for="' + x + '">' + questions[questionsIndex].answers[x].value + '</label></li>';
                quizAnswers.innerHTML = answersList;
            }
        }

    }

    function resetMessage() {
        msg.innerHTML = '';
    }

    function hitMessage() {
        msg.innerHTML = '¡Es correcto!';
    }
    function failMessage() {
        msg.innerHTML = '¡Es falso!';
    }

    function checkOption() {
        var currentAnswers = document.getElementsByTagName('input');
        var currentAnswerId;
        var currentQuestionId = quizQuestion.getAttribute('data-id');

        for (var i = 0; i < currentAnswers.length; i++) {
            answerTime = 20 - seconds;
            if (currentAnswers[i].checked) {
                currentAnswerId = currentAnswers[i].id;
                if (questions[currentQuestionId].correctAnswer.id == currentAnswerId) {
                    hitMessage();
                    rightAnswers += 1;
                    answerTime = 20 - seconds;
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
                    failMessage();
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


    return {
        start: start
    }
}
