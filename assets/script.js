var beginQuizBtn = document.querySelector("#begin");
var homepageEl = document.querySelector("#home");
var countdownTimer = document.querySelector("#countdown-timer");
var question1El = document.querySelector("#question1");
var question2El = document.querySelector("#question2");
var question3El = document.querySelector("#question3");
var question4El = document.querySelector("#question4");
var optionSelect = document.querySelectorAll(".options");
var finishQuiz = document.querySelector(".finish");
var submitName = document.querySelector("#submit");
var nameInputForm = document.querySelector("#textbox");
var highscorePage = document.querySelector(".highscore");
var finalScoreDisplay = document.querySelector("#final-score-display");
var viewHighscores = document.querySelector("#view-highscores");
var btnBack = document.querySelector("#back");
var btnClear = document.querySelector("#clear");
var initialsInput;
var highscoreList = [];
var answerKey = [4, 2, 20, 5];
var scoreResult = 0;
var choiceSelected = [];
var highscoreDataList = [];
var questionList = [question1El, question2El, question3El, question4El];
var scorePercentage;
var currentQuestion = 0;
var countdownNumber = 60;
var startInterval;
var initialsInputStorage;

beginQuizBtn.addEventListener("click", function () {
  startCountdown();
  homepageEl.dataset.state = "hidden";
  question1El.dataset.state = "visible";
});

function startCountdown() {
  startInterval = setInterval(function () {
    countdownNumber--;
    countdownTimer.textContent = "Time: " + countdownNumber;
    if (countdownNumber <= 0) {
      finishQuiz.dataset.state = "visible";
      question1El.dataset.state = "hidden";
      question2El.dataset.state = "hidden";
      question3El.dataset.state = "hidden";
      question4El.dataset.state = "hidden";
      clearInterval(startInterval);
    }
  }, 1000);
}
optionSelect.forEach(function (list) {
  list.addEventListener("click", function (event) {
    if (event.target.className === "choice") {
      choiceSelected.push(event.target.textContent);
    }
    if (currentQuestion < questionList.length - 1) {
      questionList[currentQuestion].dataset.state = "hidden";
      questionList[currentQuestion + 1].dataset.state = "visible";
    } else {
      questionList[currentQuestion].dataset.state = "hidden";
      finishQuiz.dataset.state = "visible";
      clearInterval(startInterval);
    }
    if (choiceSelected[currentQuestion] == answerKey[currentQuestion]) {
      scoreResult++;
    } else {
      countdownNumber -= 10;
    }
    scorePercentage = (scoreResult / answerKey.length) * 100;
    finalScoreDisplay.textContent =
      "Your final score is: " + scorePercentage + "%";
    currentQuestion++;
  });
});

submitName.addEventListener("click", function (event) {
  event.preventDefault();
  finishQuiz.dataset.state = "hidden";
  highscorePage.dataset.state = "visible";
  initialsInput = nameInputForm.value;
  initialsInputStorage = initialsInput + "-" + scorePercentage + "%";
  validateLocalStorage();
  highscoreDataList.push(initialsInputStorage);
  localStorage.setItem("Highscores", JSON.stringify(highscoreDataList));
  standings.textContent = "";
  nameInputForm.value = "";
  displayHighscore();
});

function validateLocalStorage() {
  if (JSON.parse(localStorage.getItem("Highscores")) == null) {
    highscoreDataList = [];
  } else {
    highscoreDataList = JSON.parse(localStorage.getItem("Highscores"));
  }
}

function displayHighscore() {
  validateLocalStorage();
  for (let i = 0; i < highscoreDataList.length; i++) {
    var standings = document.querySelector("#standings");
    var highscorePageListDisplay = document.createElement("li");
    highscorePageListDisplay.textContent = highscoreDataList[i];
    standings.appendChild(highscorePageListDisplay);
  }
}

viewHighscores.addEventListener("click", function () {
  finishQuiz.dataset.state = "hidden";
  question1El.dataset.state = "hidden";
  question2El.dataset.state = "hidden";
  question3El.dataset.state = "hidden";
  question4El.dataset.state = "hidden";
  homepageEl.dataset.state = "hidden";
  highscorePage.dataset.state = "visible";
  standings.textContent = "";
  displayHighscore();
});

btnBack.addEventListener("click", function () {
  finishQuiz.dataset.state = "hidden";
  question1El.dataset.state = "hidden";
  question2El.dataset.state = "hidden";
  question3El.dataset.state = "hidden";
  question4El.dataset.state = "hidden";
  homepageEl.dataset.state = "visible";
  highscorePage.dataset.state = "hidden";
  scoreResult = 0;
  choiceSelected = [];
  currentQuestion = 0;
  countdownNumber = 60;
});

btnClear.addEventListener("click", function () {
  localStorage.removeItem("Highscores");
  standings.textContent = "";
});
