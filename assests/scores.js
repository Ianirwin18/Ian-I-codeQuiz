function showHighscores() {
  // pulls scores from local storage
    var highscores = JSON.parse(window.localStorage.getItem("highscores")) || [];
  
    highscores.sort(function(a, b) {
      return b.score - a.score;
    });
  
    highscores.forEach(function(score) {
      // Create li for each score
      var liTag = document.createElement("li");
      liTag.textContent = score.initials + ": " + score.score;
      // Display score on page
      var olEl = document.getElementById("highscores");
      olEl.appendChild(liTag);
    });
  }
  // clears highscores
  function clearScores() {
    window.localStorage.removeItem("highscores");
    window.location.reload();
  }
  document.getElementById("clear").onclick = clearScores;
  showHighscores();