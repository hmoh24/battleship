const turnCard = document.querySelector(".turn-card");
const resultCard = document.querySelector(".result-card");
const instructionCard = document.querySelector(".instruction-card");
const instructionText = document.querySelector(".instruction-text");

function handleSwitch(gamestate, player1, player2) {
  if (
    gamestate.turn === "Player 1 place ships" &&
    player1.gameboard.allShipsPlaced()
  ) {
    gamestate.turn = "Player 2 place ships";
    instructionText.textContent = `${player1.name}, leave the screen. ${player2.name} - Place ships by: using the randomiser, or placing via the input below. Any placed ships can be moved by selecting them from the dropdown below and placing valid coordinates. [0, 0] is the top left, and [9, 9] is the bottom right.`;
  }
  if (
    gamestate.turn === "Player 2 place ships" &&
    player2.gameboard.allShipsPlaced()
  ) {
    gamestate.turn = "Display 2-1";
    instructionCard.style.display = "none";
    turnCard.style.display = "block";
    resultCard.style.display = "block";
  }
  if (gamestate.turn === "Switch 1-2" || gamestate.turn === "Switch 2-1") {
    gamestate.turn =
      gamestate.turn === "Switch 1-2" ? "Display 1-2" : "Display 2-1";
  }
}

export { handleSwitch };
