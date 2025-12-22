import Ship from "./logic/ship.js";
import Gameboard from "./logic/gameBoard.js";
import Player from "./logic/player.js";
import shipColors from "./assets/ships.js";

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

const boardElements = [...document.getElementsByClassName("board")];
boardElements.forEach((div, index) => {
  let player = index === 0 ? firstPlayer : secondPlayer;
  for (let i = 0; i < 100; i++) {
    let gridSquare = document.createElement("div");
    gridSquare.classList.add("gridSquare", "gridHover");
    gridSquare.setAttribute("coord", `${Math.floor(i / 10)}${i % 10}`);
    div.appendChild(gridSquare);
    let code = player.gameboard.boardMatrix[i];
    let colour;
    switch (code) {
      case 0:
        colour = "transparent";
        break;
      case 1:
        colour = shipColors.Carrier;
        break;
      case 2:
        colour = shipColors.Battleship;
        break;
      case 3:
        colour = shipColors.Cruiser;
        break;
      case 4:
        colour = shipColors.Submarine;
        break;
      case 5:
        colour = shipColors.Destroyer;
        break;
      default:
        colour = "transparent";
        break;
    }
    gridSquare.style.backgroundColor = colour;
  }
});

//Set state after ships have been placed to prepare for rounds. Player 1 starts first
let gameState = "Player 1 turn";
const boardContainer = document.getElementsByClassName("boards")[0];
const [board1, board2] = boardElements;
const board1Grids = [...board1.childNodes].filter((element) => {
  return element.classList.contains("gridSquare");
});
const board2Grids = [...board2.childNodes].filter((element) => {
  return element.classList.contains("gridSquare");
});

boardContainer.addEventListener("click", (e) => {
  const [board1, board2] = boardElements;
  const board1Grids = [...board1.childNodes].filter((element) => {
    return element.classList.contains("gridSquare");
  });
  const board2Grids = [...board2.childNodes].filter((element) => {
    return element.classList.contains("gridSquare");
  });
  if (gameState === "Not Started") {
    if (e.target.closest[".board"] === board1) {
      e.preventDefault();
      board1Grids.forEach((element) => {
        element.classList.toggle("gridHover");
      });
    }
    if (e.target.closest[".board"] === board2) {
    }
  }
});

//render function to loop through the gameboard state and display the correct info
//parameter to show ships or no
//hits should be shown regardless
//parameter to disable clicks on own board/hover to prevent attacks on own ship.

//render function to show page between attacks, including switch over on placing ships

//event listener -> check who's turn it is, and keep track of it.
//click then switches turn and renders in between page
//clicking next turn renders page for next player's turn
//core loop, start and ending conditions can be done after.
