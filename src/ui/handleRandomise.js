import Ship from "../logic/ship.js";
import renderBoard from "./renderBoard.js";

function randomiseLogic(player) {
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
}

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
    randomiseLogic(player);
    renderBoard(board, player, false, true);
  }
}

export { handleRandomise, randomiseLogic };
