import renderBoard from "./renderBoard.js";
const turnCard = document.querySelector(".turn-card");
const resultCard = document.querySelector(".result-card");
const instructionCard = document.querySelector(".instruction-card");
const resultText = document.querySelector(".result-text");

function handleRestart(gamestate, player1, player2, firstboard, secondboard) {
  instructionCard.style.display = "block";
  turnCard.style.display = "none";
  resultCard.style.display = "none";
  resultText.textContent = "Planning next attack";
  gamestate.turn = "Player 1 place ships";
  player1.resetGameboard();
  player2.resetGameboard();
  renderBoard(firstboard, player1, false, true);
  renderBoard(secondboard, player2, false, false);
}

export { handleRestart };
