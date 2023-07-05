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

  const buttons = document.querySelectorAll("button");
  buttons.forEach((button) => {
    button.removeEventListener('click', buttonClick);
  });
}

function buttonClick(e) {
  playRound(e.srcElement.textContent, getComputerChoice());
}
const buttons = document.querySelectorAll("button");

buttons.forEach((button) => {
  button.addEventListener('click', buttonClick);
});

playerScore = 0;
computerScore = 0;
draws = 0;
