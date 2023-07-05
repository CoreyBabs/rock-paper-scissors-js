function getComputerChoice() {
  let choice = getRandomInt(0, 3);
  switch (choice) {
    case 0: return "Rock";
    case 1: return "Paper";
    case 2: return "Scissors";
    default: throw("Invalid Value")
  }
}

function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

// retuns 1 for player win, 0 for draw, and -1 for a computer win
function calculateWinner(player, computer) {
  if (player === computer) {
    return 0;
  }

  if (player === "rock") {
    switch(computer) {
      case "paper": return -1;
      case "scissors": return 1;
      default: return 0;
    }
  }
  else if (player === "paper") {
    switch(computer) {
      case "scissors": return -1;
      case "rock": return 1;
      default: return 0;
    }
  }
  else if (player === "scissors") {
    switch(computer) {
      case "rock": return -1;
      case "paper": return 1;
      default: return 0;
    }
  }

  return 0;
}

function playRound(playerSelection, computerChoice) {
  let player = playerSelection.toLowerCase();
  let computer = computerChoice.toLowerCase();

  let winner = calculateWinner(player, computer);

  switch (winner) {
    case 0: updateDraw(); break;
    case 1: updateWinner(); break;
    case -1: updateComputer(); break;
  }
}

function updateWinner() {
  playerScore += 1;
  
  let ps = document.querySelector("#player");
  ps.textContent = `Player: ${playerScore}`;

  if (playerScore === 5) {
    displayWinner("You Win!");
  }
}

function updateComputer() {
  computerScore += 1;
  
  let cs = document.querySelector("#computer");
  cs.textContent = `Computer: ${computerScore}`;

  if (computerScore === 5) {
    displayWinner("Computer Wins!")
  }
}

function updateDraw() {
  draws += 1;
  
  let ds = document.querySelector("#draws");
  ds.textContent = `Draws: ${draws}`;
}

function displayWinner(winner) {
  let body = document.querySelector("body");
  let finalScore = document.createElement("h3");
  finalScore.textContent = winner;

  body.appendChild(finalScore);

  // game is over so disable buttons
  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.removeEventListener('click', buttonClick);
  });

  let rdiv = document.createElement("div");
  rdiv.setAttribute("id", "restart");

  let restart = document.createElement("button");
  restart.textContent = "Restart";
  restart.addEventListener('click', resetGame);

  rdiv.appendChild(restart);
  body.appendChild(rdiv);
  
}

function resetGame() {
  // set scores to -1, update calls will add 1 to zero them out
  // should be refactored to allow for proper resetting here
  draws = -1;
  playerScore = -1;
  computerScore = -1;

  // update score text
  updateDraw();
  updateWinner();
  updateComputer();
  
  // reactivate buttons
  subscribeButtons();

  let body = document.querySelector("body");

  // remove winner text
  let winner = document.querySelector("h3");
  body.removeChild(winner);

  // remove restart button
  let restart = document.querySelector("#restart");
  body.removeChild(restart);
}

function buttonClick(e) {
  playRound(e.srcElement.textContent, getComputerChoice());
}

function subscribeButtons() {
  const buttons = document.querySelectorAll("button");

  buttons.forEach((button) => {
    button.addEventListener('click', buttonClick);
  });
}

playerScore = 0;
computerScore = 0;
draws = 0;

subscribeButtons();
