import renderBoard from "./renderBoard.js";
const resultText = document.querySelector(".result-text");
const turnText = document.querySelector(".turn-text");

function handleBoardClick(e, thisPlayer, otherPlayer, otherBoard, gamestate) {
  const coordStringArray = e.target.dataset["coord"].split("");
  const coordNumericArray = coordStringArray.map(Number);
  let resultString = otherPlayer.gameboard.receiveAttack(coordNumericArray);
  resultText.textContent = resultString;
  if (resultString === "Missed!") {
    renderBoard(otherBoard, otherPlayer, false, false);
    gamestate.turn === "Player 1 Turn"
      ? (gamestate.turn = "Switch 1-2")
      : (gamestate.turn = "Switch 2-1");
  } else {
    renderBoard(otherBoard, otherPlayer, true, false);
    if (otherPlayer.gameboard.allShipsSunk()) {
      gamestate.turn = `${thisPlayer.name} wins!!`;
      turnText.textContent = gamestate.turn;
      renderBoard(otherBoard, otherPlayer, false, false);
      alert(`${thisPlayer.name} wins!!`);
    }
  }
}

export { handleBoardClick };
