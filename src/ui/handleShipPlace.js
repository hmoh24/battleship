import Ship from "../logic/ship.js";
import renderBoard from "./renderBoard.js";
const instructionForm = document.querySelector(".instruction-card");
const shipSelect = instructionForm.querySelector("#shipSelect");
const shipCoordsInput = instructionForm.querySelector("#shipCoords");

function handlePlaceShip(
  e,
  player1,
  playerBoard1,
  player2,
  playerBoard2,
  gameState
) {
  e.preventDefault();
  const shipType = shipSelect.value;
  if (!shipType || shipType === "none") {
    alert("Select a ship type before submitting.");
    return;
  }

  const coordMatches = shipCoordsInput.value.match(/-?\d+/g);
  if (!coordMatches || coordMatches.length % 2 !== 0) {
    alert("Invalid coordinates. Example: [0, 6], [0, 7]");
    return;
  }

  const coords = [];
  for (let i = 0; i < coordMatches.length; i += 2) {
    coords.push([Number(coordMatches[i]), Number(coordMatches[i + 1])]);
  }

  let [player, board] =
    gameState === "Player 1 place ships"
      ? [player1, playerBoard1]
      : [player2, playerBoard2];
  const ship = new Ship(shipType);
  player.gameboard.replace(ship, coords);
  renderBoard(board, player, false, true);
}

export { handlePlaceShip };
