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

	getPairQuestionAnswers(function (data) {
		questions = data;
	});


	function questionTimer() {
		seconds--;
		var timer = document.querySelector('.timer');
		timer.innerHTML = seconds;
		if (seconds === 0) {
			seconds = 100;
			nextQuestion();
		}
	}

	var i = 0;
	var quizQuestion = document.querySelector('.quiz-questions');
	var msg = document.querySelector('.msg');

	function nextQuestion() {
		msg.innerHTML = '';
		var quizContainer = document.querySelector('.show-quiz');
		var quizAnswers = document.querySelector('.quiz-answers');

		if (i < questions.length) {
			quizQuestion.innerHTML = questions[i].question;
			quizQuestion.setAttribute('id', i);
			var answersList = "";
			for (let x = 0; x < questions[i].answers.length; x++) {
				answersList += '<li id="'+ x + '" class="li-answers"><input id="' + x  + '" type="radio" name="answers"/><label for="' + x + '">' + questions[i].answers[x].value + '</label></li>';
				quizAnswers.innerHTML = answersList;
			}
			i++;
		}
	}

	function checkOption() {
		var currentAnswers = document.getElementsByTagName('input');
		var currentAnswerId;
		var currentQuestionId = quizQuestion.getAttribute('id');

		for (var i = 0; i < currentAnswers.length; i++) {
			if (currentAnswers[i].checked) {
				currentAnswerId = i;
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

	function start() {
		seconds = 100;
		var counter = setInterval(questionTimer, 1000);
		var nextQuestionButton = document.querySelector('.next-question');
		var sendAnswerButton = document.querySelector('.send-answer');
		sendAnswerButton.addEventListener('click', checkOption);
		nextQuestionButton.addEventListener('click', nextQuestion);
	}

	return {
		start: start,
		nextQuestion: nextQuestion
	}
}
