var trivia = {
  initialScreen: "",
  correctCounter: 0,
  inCorrectCounter: 0,
  unAnsweredCounter: 0,
  gameHTML: "",
  questionsArray: [
    "Who was the most popular president in NCR history?", "What was the original name of the NCR capital?", "What is the animal on the NCR's flag?", "In what year did the NCR join forces with the Desert Rangers?", "Which NCR currency bill is President Tandi on?"],
  answerArray: [
    ["President Kimball", "President Tibbett", "President Tandi", "President Peterson"], ["The Boneyard", "Aradesh", "Shady Sands", "Vault 13"], ["An eagle", "A two-headed snake", "A two-tailed lion", "A two-headed bear"], ["2077", "2271", "2200", "2170"], ["$5", "$100", "$20", "$1"],],
  correctAnswers: [
    "C. President Tandi", "C. Shady Sands", "D. A two-headed bear", "B. 2271", "B. $100"],
  imageArray: [
    "<img class='center-block img-right' src='assets/images/tandi.png'>", "<img class='center-block img-right' src='assets/images/shadysands.png'>", "<img class='center-block img-right' src='assets/images/ncrflag.png'>", "<img class='center-block img-right' src='assets/images/desertrangers.png'>", "<img class='center-block img-right' src='assets/images/ncrbill.png'>"],
  clock: "",
  questionCounter: 0,
  timeCounter: 20,
};


function startScreen() {
  trivia.initialScreen = "<p class='text-center main-button'><a class='btn btn-primary btn-lg start-button text-center' href='#'>Start</a></p>";
  $(".main-area").html(trivia.initialScreen);
};

function timer() {
  trivia.clock = setInterval(twentySeconds, 1000);
  function twentySeconds() {
    if (trivia.timeCounter === 0) {
      timeOutLoss();
      clearInterval(trivia.clock);
    }
    if (trivia.timeCounter > 0) {
      trivia.timeCounter--;
    }
    $(".timer").html(trivia.timeCounter);
  }
};

function wait() {
  if (trivia.questionCounter < 4) {
    trivia.questionCounter++;
    generateHTML();
    trivia.timeCounter = 20;
    timer();
  }
  else {
    finalScreen();
  }
};

function win() {
  trivia.correctCounter++;
  trivia.gameHTML = "<p class='text-center'> Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Correct! The answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function loss() {
  trivia.inCorrectCounter++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>Wrong! The correct answer is: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function timeOutLoss() {
  trivia.unAnsweredCounter++;
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>You ran out of time!  The correct answer was: " + trivia.correctAnswers[trivia.questionCounter] + "</p>" + trivia.imageArray[trivia.questionCounter];
  $(".main-area").html(trivia.gameHTML);
  setTimeout(wait, 4000);
};

function finalScreen() {
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>" + trivia.timeCounter + "</span></p>" + "<p class='text-center'>All done, here's how you did!" + "</p>" + "<p class='summary-correct'>Correct Answers: " + trivia.correctCounter + "</p>" + "<p>Wrong Answers: " + trivia.inCorrectCounter + "</p>" + "<p>Unanswered: " + trivia.unAnsweredCounter + "</p>" + "<p class='text-center reset-button-container'><a class='btn btn-primary btn-lg btn-block reset-button' href='#' role='button'>Reset The Quiz!</a></p>";
  $(".main-area").html(trivia.gameHTML);
};

function resetGame() {
  trivia.questionCounter = 0;
  trivia.correctCounter = 0;
  trivia.inCorrectCounter = 0;
  trivia.unAnsweredCounter = 0;
  trivia.timeCounter = 20;
  generateHTML();
  timer();
};

function generateHTML() {
  trivia.gameHTML = "<p class='text-center timer-p'>Time Remaining: <span class='timer'>20</span></p><p class='text-center'>" + trivia.questionsArray[trivia.questionCounter] + "</p><button class='first-answer answer'>A. " + trivia.answerArray[trivia.questionCounter][0] + "</button><br><button class='answer'>B. " + trivia.answerArray[trivia.questionCounter][1] + "</button><br><button class='answer'>C. " + trivia.answerArray[trivia.questionCounter][2] + "</button><br><button class='answer'>D. " + trivia.answerArray[trivia.questionCounter][3] + "</button>";
  $(".main-area").html(trivia.gameHTML);
}

startScreen();

$("body").on("click", ".start-button", function (event) {
  event.preventDefault();
  generateHTML();

  timer();
});

$("body").on("click", ".answer", function (event) {
  selectedAnswer = $(this).text();
  if (selectedAnswer === trivia.correctAnswers[trivia.questionCounter]) {

    clearInterval(trivia.clock);
    win();
  }
  else {

    clearInterval(trivia.clock);
    loss();
  }
});

$("body").on("click", ".reset-button", function (event) {
  resetGame();
});