function application() {
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

	function nextQuestion() {
		var quizContainer = document.querySelector('.show-quiz');
		var quizAnswers = document.querySelector('.quiz-answers');

		if (i < questions.length) {
			quizQuestion.innerHTML = questions[i].question;
			quizQuestion.setAttribute('id', (i +1));
			var answersList = "";
			for (let x = 0; x < questions[i].answers.length; x++) {
				answersList += '<li id="'+ (x + 1) + '" class="li-answers"><input id="' + (x + 1) + '" type="radio" name="answers"/><label for="' + (x + 1) + '">' + questions[i].answers[x].value + '</label></li>';
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
				currentAnswerId = i + 1;
				console.log(currentAnswerId);
				return currentAnswerId;
			};
		}
	}

	function start() {
		seconds = 5;
		var counter = setInterval(questionTimer, 1000);
		var nextQuestionButton = document.querySelector('.next-question');
		nextQuestionButton.addEventListener('click', checkOption);
		nextQuestionButton.addEventListener('click', nextQuestion);
	}

	return {
		start: start,
		nextQuestion: nextQuestion
	}
}
