import Ship from "./logic/ship.js";
import Gameboard from "./logic/gameBoard.js";
import Player from "./logic/player.js";
import render from "./render/render.js";

let firstPlayer;
let player1Type = "Human";
let secondPlayer;
let player2Type;

const startForm = document.querySelector(".startCard");
const modeButtons = startForm.querySelectorAll(".modeButton");
const player1NameInput = startForm.querySelector("#player1Name");
const player2NameInput = startForm.querySelector("#player2Name");

startForm.addEventListener("click", (e) => {
  const btn = e.target.closest(".modeButton");
  if (btn) {
    modeButtons.forEach((button) =>
      button.classList.remove("modeButtonSelected")
    );
    btn.classList.add("modeButtonSelected");
  }
});

startForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const selected = startForm.querySelector(".modeButtonSelected");
  player2Type = selected.dataset.mode;
  const player1Name = player1NameInput.value.trim();
  const player2Name = player2NameInput.value.trim();
  try {
    firstPlayer = new Player(player1Type, player1Name);
    secondPlayer = new Player(player2Type, player2Name);
    console.log(firstPlayer, secondPlayer);
    alert(`success ${firstPlayer.name} ${secondPlayer.name}`);
  } catch (e) {
    alert(e.message);
  }
});

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
const [player1Board, player2Board] = boardElements;
boardElements.forEach((div) => {
  for (let i = 0; i < 100; i++) {
    let gridSquare = document.createElement("div");
    gridSquare.classList.add("gridSquare", "gridHover");
    gridSquare.setAttribute("data-coord", `${i % 10}${Math.floor(i / 10)}`);
    div.appendChild(gridSquare);
  }
});

//Initialise
let gameState = "Player 1 Turn";
render(player1Board, firstPlayer, false, true);
render(player2Board, secondPlayer, true, false);

//OPTIMISATION - make a map to handle event handler logic cleanly
// let turnLogic = {
//   player1: {
//     boardRender: [
//       render(player1Board, firstPlayer, false, true),
//       render(player2Board, secondPlayer, true, false),
//     ],
//   },
// };
const turnElement = document.getElementsByClassName("turn-text")[0];
const resultElement = document.getElementsByClassName("result-text")[0];
const boardContainer = document.getElementsByClassName("boards")[0];
boardContainer.addEventListener("click", (e) => {
  console.log("State: ", gameState);

  if (gameState === "Switch 1-2" || gameState === "Switch 2-1") {
    //none
  } else if (gameState === "Player 1 Turn") {
    if (
      e.target.closest(".board") === player2Board &&
      e.target.classList.contains("gridSquare")
    ) {
      const coordStringArray = e.target.dataset["coord"].split("");
      const coordNumericArray = coordStringArray.map(Number);
      let resultString =
        secondPlayer.gameboard.receiveAttack(coordNumericArray);
      console.log(resultString);
      resultElement.textContent = resultString;
      if (resultString === "Missed!") {
        render(player2Board, secondPlayer, false, false);
        gameState = "Switch 1-2";
      } else {
        render(player2Board, secondPlayer, true, false);
        if (secondPlayer.gameboard.allShipsSunk())
          alert(`${firstPlayer.name} wins!!`);
      }
    }
  } else if (gameState === "Player 2 Turn") {
    if (
      e.target.closest(".board") === player1Board &&
      e.target.classList.contains("gridSquare")
    ) {
      const coordStringArray = e.target.dataset["coord"].split("");
      const coordNumericArray = coordStringArray.map(Number);
      let resultString = firstPlayer.gameboard.receiveAttack(coordNumericArray);
      console.log(resultString);
      resultElement.textContent = resultString;
      if (resultString === "Missed!") {
        render(player1Board, firstPlayer, false, false);
        gameState = "Switch 2-1";
      } else {
        render(player1Board, firstPlayer, true, false);
        if (firstPlayer.gameboard.allShipsSunk())
          alert(`${secondPlayer.name} wins!!`);
      }
    }
  }
  turnElement.textContent = gameState;
});

const footer = document.getElementsByClassName("footer")[0];
const [displayBtn, switchBtn] = document.getElementsByClassName("ghost");
footer.addEventListener("click", (e) => {
  console.log("State: ", gameState);
  if (
    e.target === switchBtn &&
    (gameState === "Switch 1-2" || gameState === "Switch 2-1")
  ) {
    render(player1Board, firstPlayer, false, false);
    render(player2Board, secondPlayer, false, false);
    gameState = gameState === "Switch 1-2" ? "Display 1-2" : "Display 2-1";
  }
  if (e.target === displayBtn) {
    if (gameState === "Display 1-2") {
      render(player1Board, firstPlayer, true, false);
      render(player2Board, secondPlayer, false, true);
      gameState = "Player 2 Turn";
      resultElement.textContent = "Planning next attack";
      console.log("after click", gameState);
    }
    if (gameState === "Display 2-1") {
      render(player1Board, firstPlayer, false, true);
      render(player2Board, secondPlayer, true, false);
      gameState = "Player 1 Turn";
      resultElement.textContent = "Planning next attack";

      console.log("after click", gameState);
    }
  }
  turnElement.textContent = gameState;
});
