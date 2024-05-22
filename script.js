document.addEventListener("DOMContentLoaded", () => {
  const humanScoreEl = document.getElementById("human-score");
  const computerScoreEl = document.getElementById("computer-score");
  const resultEl = document.getElementById("result");
  const popup = document.getElementById("popup");
  const rulesBtn = document.getElementById("rules-btn");
  const closeBtn = document.getElementById("close-btn");
  const choices = ["rock", "paper", "scissors"];

  let humanScore = parseInt(localStorage.getItem("humanScore")) || 0;
  let computerScore = parseInt(localStorage.getItem("computerScore")) || 0;

  updateScores();

  document.querySelectorAll(".choice").forEach((choice) => {
    choice.addEventListener("click", () => {
      const humanChoice = choice.id;
      const computerChoice =
        choices[Math.floor(Math.random() * choices.length)];
      const result = determineWinner(humanChoice, computerChoice);
      displayResult(result, humanChoice, computerChoice);
      updateScores();
      saveScores();
      if (result === "human") {
        triggerCelebration();
      }
    });
  });

  rulesBtn.addEventListener("click", () => {
    popup.style.display = "flex";
  });

  closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
  });

  function determineWinner(human, computer) {
    if (human === computer) return "draw";
    if (
      (human === "rock" && computer === "scissors") ||
      (human === "scissors" && computer === "paper") ||
      (human === "paper" && computer === "rock")
    ) {
      humanScore++;
      return "human";
    } else {
      computerScore++;
      return "computer";
    }
  }

  function displayResult(result, humanChoice, computerChoice) {
    if (result === "human") {
      resultEl.textContent = `You win! ${humanChoice} beats ${computerChoice}`;
    } else if (result === "computer") {
      resultEl.textContent = `You lose! ${computerChoice} beats ${humanChoice}`;
    } else {
      resultEl.textContent = "It's a draw!";
    }
  }

  function updateScores() {
    humanScoreEl.textContent = ` ${humanScore}`;
    computerScoreEl.textContent = ` ${computerScore}`;
  }

  function saveScores() {
    localStorage.setItem("humanScore", humanScore);
    localStorage.setItem("computerScore", computerScore);
  }

  function triggerCelebration() {
    resultEl.classList.add("celebration");
    setTimeout(() => {
      resultEl.classList.remove("celebration");
    }, 1000);
  }
});
