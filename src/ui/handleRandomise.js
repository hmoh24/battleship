import Ship from "../logic/ship.js";
import renderBoard from "./renderBoard.js";
function handleRandomise(
  player1,
  playerboard1,
  player2,
  playerboard2,
  gamestate
) {
  let player;
  let board;
  if (
    gamestate === "Player 1 place ships" ||
    gamestate === "Player 2 place ships"
  ) {
    [player, board] =
      gamestate === "Player 1 place ships"
        ? [player1, playerboard1]
        : [player2, playerboard2];
    player.resetGameboard();
    const ships = [
      new Ship("Carrier"),
      new Ship("Battleship"),
      new Ship("Cruiser"),
      new Ship("Submarine"),
      new Ship("Destroyer"),
    ];
    ships.forEach((ship) => {
      const coords = player.gameboard.randomiseCoordinates(ship);
      player.gameboard.place(ship, coords);
    });
    renderBoard(board, player, true, true);
  }
}

export { handleRandomise };
