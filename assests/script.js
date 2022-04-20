var currentQuestionIndex = 0;
var time = questions.length * 8;
var timerId;
var score = 0;
var initials;
var questionsEl = document.getElementById("questions");
var timerEl = document.getElementById("time");
var choicesEl = document.getElementById("choices");
var submitBtn = document.getElementById("submit");
var startBtn = document.getElementById("start");
var initialsEl = document.getElementById("initials");
var announcementEl = document.getElementById("announcement");

function start () {
    var startScreenEl = document.getElementById("start-screen");
    startScreenEl.setAttribute("class", "hide");
    questionsEl.removeAttribute("class");
    timerId = setInterval(timer, 1000);
    timerEl.textContent = time;

    showQuestion();
}

function showQuestion() {
    var currentQuestion = questions[currentQuestionIndex];
    var titleEl = document.getElementById("question-title");
    titleEl.textContent = currentQuestion.title;
    choicesEl.innerHTML = "";

    currentQuestion.choices.forEach(function(choice, i) {
        var choiceNode = document.createElement("button");
        choiceNode.setAttribute("class", "choice");
        choiceNode.setAttribute("value", choice);
        choiceNode.textContent = i + 1 + "." + choice;
        choiceNode.onclick = questionClick;
        choicesEl.appendChild(choiceNode);
    });
}

function questionClick() {
    if (this.value !== questions[currentQuestionIndex].answer) {
        time -= 10;
        if (time < 0) {
            time = 0;
        }
        timerEl.textContent = time;
        announcementEl.textContent = "Wrong!";
    } else {
        announcementEl.textContent = "Correct!";
    }
    announcementEl.setAttribute("class", "announcement");
    setTimeout(function() {
        announcementEl.setAttribute("class", "announcement hide");
    }, 2000);

    currentQuestionIndex++;

    if(currentQuestionIndex === questions.length) {
        endGame();
    } else {
        showQuestion();
    }
}

function endGame() {
    clearInterval(timerId);

    var endScreenEl = document.getElementById("end-screen");
    endScreenEl.removeAttribute("class");

    var finalScoreEl = document.getElementById("final-score");
    finalScoreEl.textContent = time;

    questionsEl.setAttribute("class", "hide");
}

function timer() {
    time --;
    timerEl.textContent = time;

    if(time <= 0){
        endGame();
    }
}

function saveScore() {
    var initials = initialsEl.value.trim();
    if(initials !== "") {
        var highScores = JSON.parse(window.localStorage.getItem("highscores")) || [];

        var newScore = {
            score: score,
            initials: "initials"
        };
        highScores.push(newScore);
        window.localStorage.setItem("highscores", JSON.stringify(highScores));
        window.location.href = "Scores.html";
    }
}

function typeInitials(event) {
    if(event.key === "Enter") {
        saveScore();
    }
}

startBtn.onclick = start
submitBtn.onclick = saveScore
initialsEl.onkeyup = typeInitials