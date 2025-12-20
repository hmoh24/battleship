import Ship from "./logic/ship";
import Gameboard from "./logic/gameBoard";
import Player from "./logic/player";

let firstPlayer = new Player("Human", "Bob");
let secondPlayer = new Player("Human", "Jim");

//Instantiate game boards
const placeInitialShips = () => {
  const firstCarrier = new Ship("Carrier");
  const firstBattleship = new Ship("Battleship");
  const firstCruiser = new Ship("Cruiser");
  const firstSubmarine = new Ship("Submarine");
  const firstDestroyer = new Ship("Destroyer");

  firstPlayer.gameboard.place(firstCarrier, [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
  ]);
  firstPlayer.gameboard.place(firstBattleship, [
    [0, 2],
    [1, 2],
    [2, 2],
    [3, 2],
  ]);
  firstPlayer.gameboard.place(firstCruiser, [
    [0, 4],
    [1, 4],
    [2, 4],
  ]);
  firstPlayer.gameboard.place(firstSubmarine, [
    [5, 6],
    [6, 6],
    [7, 6],
  ]);
  firstPlayer.gameboard.place(firstDestroyer, [
    [8, 9],
    [9, 9],
  ]);

  const secondCarrier = new Ship("Carrier");
  const secondBattleship = new Ship("Battleship");
  const secondCruiser = new Ship("Cruiser");
  const secondSubmarine = new Ship("Submarine");
  const secondDestroyer = new Ship("Destroyer");

  secondPlayer.gameboard.place(secondCarrier, [
    [9, 0],
    [9, 1],
    [9, 2],
    [9, 3],
    [9, 4],
  ]);
  secondPlayer.gameboard.place(secondBattleship, [
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
  ]);
  secondPlayer.gameboard.place(secondCruiser, [
    [0, 5],
    [1, 5],
    [2, 5],
  ]);
  secondPlayer.gameboard.place(secondSubmarine, [
    [4, 7],
    [5, 7],
    [6, 7],
  ]);
  secondPlayer.gameboard.place(secondDestroyer, [
    [0, 9],
    [1, 9],
  ]);
};
placeInitialShips();
