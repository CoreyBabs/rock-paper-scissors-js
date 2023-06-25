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
    case 0: return [winner, "It's a tie!"];
    case 1: return [winner, `You Win! ${player} beats ${computer}`];
    case -1: return [winner, `You Lose! ${computer} beats ${player}`];
  }
}

function game() {
  let total_score = 0;
  for (let i = 0; i < 5; i++) {
    let playerChoice = prompt("Rock Paper Scissors");
    let [score, result] = playRound(playerChoice, getComputerChoice())
    total_score += score;
    console.log(result);    
  }

  if (total_score === 0) {
    console.log("It's a Tie!");
  }
  else if (total_score > 0) {
    console.log("You Win!");
  }
  else {
    console.log("Computer Wins!");
  }
}

game();

