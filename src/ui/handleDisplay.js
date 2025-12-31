import renderBoard from "./renderBoard.js";
const resultText = document.querySelector(".result-text");

function handleDisplay(gamestate, player1, player2, firstboard, secondboard) {
  if (gamestate.turn === "Display 1-2") {
    renderBoard(firstboard, player1, true, false);
    renderBoard(secondboard, player2, false, true);
    gamestate.turn = "Player 2 Turn";
    resultText.textContent = "Planning next attack";
  }
  if (gamestate.turn === "Display 2-1") {
    renderBoard(firstboard, player1, false, true);
    renderBoard(secondboard, player2, true, false);
    gamestate.turn = "Player 1 Turn";
    resultText.textContent = "Planning next attack";
  }
}

export { handleDisplay };
