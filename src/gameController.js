import renderBoard from "./ui/renderBoard.js";
import {
  buttonSwitch,
  createPlayers,
  startFormUIUpdate,
} from "./ui/startForm.js";
import { generateGrid } from "./ui/board.js";
import { handlePlaceShip } from "./ui/handleShipPlace.js";
import { handleRandomise, randomiseLogic } from "./ui/handleRandomise.js";
import { handleBoardClick } from "./ui/handleBoardClick.js";
import { handleSwitch } from "./ui/handleSwitch.js";
import { handleDisplay } from "./ui/handleDisplay.js";
import { handleRestart } from "./ui/handleRestart.js";
console.log("Game controller run");

let firstPlayer;
let secondPlayer;
let gameState = { turn: "Start" };

const boardElements = [...document.getElementsByClassName("board")];
const [player1Board, player2Board] = boardElements;
const boardContainer = document.getElementsByClassName("boards")[0];
const turnText = document.querySelector(".turn-text");

const startForm = document.querySelector(".startCard");
startForm.addEventListener("click", (e) => {
  buttonSwitch(e);
});

startForm.addEventListener("submit", (e) => {
  e.preventDefault();
  if (gameState.turn !== "Start") {
    alert("Game state is incorrect for this function, refresh to fix.");
  } else {
    try {
      [firstPlayer, secondPlayer] = createPlayers();
      startFormUIUpdate(firstPlayer, secondPlayer);
      gameState.turn = "Player 1 place ships";
    } catch (error) {
      alert(error.message);
    }
  }
});

generateGrid(boardElements);

const randomiseBtn = document.querySelector('[data-action="randomise"]');
randomiseBtn.addEventListener("click", () => {
  handleRandomise(
    firstPlayer,
    player1Board,
    secondPlayer,
    player2Board,
    gameState.turn
  );
});

const instructionForm = document.querySelector(".instruction-card");
instructionForm.addEventListener("submit", (e) => {
  try {
    handlePlaceShip(
      e,
      firstPlayer,
      player1Board,
      secondPlayer,
      player2Board,
      gameState.turn
    );
  } catch (err) {
    alert(err.message);
  }
});

boardContainer.addEventListener("click", (e) => {
  if (gameState.state === "Computer") return;
  if (gameState.turn === "Player 1 Turn") {
    if (
      e.target.closest(".board") === player2Board &&
      e.target.classList.contains("gridSquare")
    ) {
      handleBoardClick(
        e,
        firstPlayer,
        player1Board,
        secondPlayer,
        player2Board,
        gameState
      );
    }
  } else if (gameState.turn === "Player 2 Turn") {
    if (
      e.target.closest(".board") === player1Board &&
      e.target.classList.contains("gridSquare")
    ) {
      handleBoardClick(
        e,
        secondPlayer,
        player2Board,
        firstPlayer,
        player1Board,
        gameState
      );
    }
  }
  turnText.textContent = gameState.turn;
});

const footer = document.getElementsByClassName("footer")[0];
const displayBtn = footer.querySelector('[data-action="display"]');
const switchBtn = footer.querySelector('[data-action="switch"]');
const restartBtn = footer.querySelector('[data-action="restart"]');
footer.addEventListener("click", (e) => {
  if (
    e.target === switchBtn &&
    (gameState.turn === "Player 1 place ships" ||
      gameState.turn === "Player 2 place ships" ||
      gameState.turn === "Switch 1-2" ||
      gameState.turn === "Switch 2-1")
  ) {
    renderBoard(player1Board, firstPlayer, false, false);
    renderBoard(player2Board, secondPlayer, false, false);
    handleSwitch(gameState, firstPlayer, secondPlayer);
  }

  if (e.target === displayBtn) {
    handleDisplay(
      gameState,
      firstPlayer,
      secondPlayer,
      player1Board,
      player2Board
    );
    if (secondPlayer.gameboard.allShipsPlaced() === false)
      randomiseLogic(secondPlayer);
  }

  if (e.target === restartBtn) {
    handleRestart(
      gameState,
      firstPlayer,
      secondPlayer,
      player1Board,
      player2Board
    );
  }

  turnText.textContent = gameState.turn;
});
