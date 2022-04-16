var spanEl = document.querySelector(".timeLeft");
var quizbodyEl = document.querySelector(".quizbody");
var timeLeft = 45;
var currentQuestionIndex = 0;

var Questions = [
  {
    question: "How many star Wars movies are there?",
    answers: [ "9","6","12",],
    correct: "9",
  },
  {
    question: "Who is the Master mind behind the star Wars?",
    answers: ["Michael Bay", "J.J. Abrams", "George Lucas", "Steven Spielberg"],
    correct: "George Lucas",
  },
  {
    question: "Who is the True Darth lord of the Sith?",
    answers: ["Darth Sidiuos", "Dark Jar Jar", "Darth Bane", "Darth Revan"],
    correct: "Darth Jar Jar",
  },
  {
    question: "Which of these is NOT part of the Jedi Code?",
    answers: ["Peace", "Strength", "The Force", "Serenity"],
    correct: "Strength",
  },
];

//counting function
function count() {
  timeLeft--;
  spanEl.textContent = timeLeft;
  if (timeLeft === 0) {
    window.location.replace()
  }
  //build additional logic here to handle if time runs out
}

//create the timer function

var timer = setInterval(count, 1000);

//function to put the current question and choices on the page
function showQuestion() {
  quizbodyEl.innerHTML = "";
  var q = Questions[currentQuestionIndex];
  var qTitleEl = document.createElement("h1");
  qTitleEl.textContent = q.question; //q.question
  quizbodyEl.append(qTitleEl);

  //loop through the answers array and put them on the page
  var answers = q.answers;
  for (var i = 0; i < answers.length; i++) {
    var answer = answers[i];
    var button = document.createElement("button");
    button.textContent = answer;
    button.addEventListener("click", function (event) {
      var selectedAnswer = event.target.textContent;
      alert("You Chose  " + selectedAnswer);
      if (selectedAnswer === q.correct) {
        //handle correct logic here
        correct();
      } else {
        //handle incorrect logic here
        incorrect();
      }

      //go to next q here
      currentQuestionIndex++;
      showQuestion();
    });
    quizbodyEl.append(button);
    //after a button is created, add a event listener to it to handle clicking
  }
}

function correct() {
  alert("CORRECT!");
}

function incorrect() {
  alert("WRONG!");
}

showQuestion();