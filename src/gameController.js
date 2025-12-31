import renderBoard from "./ui/renderBoard.js";
import {
  buttonSwitch,
  createPlayers,
  startFormUIUpdate,
} from "./ui/startForm.js";
import { generateGrid } from "./ui/board.js";
import { handlePlaceShip } from "./ui/handleShipPlace.js";
import { handleRandomise } from "./ui/handleRandomise.js";
import { handleBoardClick } from "./ui/handleBoardClick.js";
import { handleSwitch } from "./ui/handleSwitch.js";
import { handleDisplay } from "./ui/handleDisplay.js";
console.log("Game controller run");

let firstPlayer;
let secondPlayer;
let gameState = { turn: "Start" };

const boardElements = [...document.getElementsByClassName("board")];
const [player1Board, player2Board] = boardElements;
const boardContainer = document.getElementsByClassName("boards")[0];

//info section
const turnCard = document.querySelector(".turn-card");
const resultCard = document.querySelector(".result-card");
const instructionCard = document.querySelector(".instruction-card");
const turnText = document.querySelector(".turn-text");
const resultText = document.querySelector(".result-text");

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

//OPTIMISATION - make a map to handle event handler logic cleanly
// let turnLogic = {
//   player1: {
//     boardRender: [
//       renderBoard(player1Board, firstPlayer, false, true),
//       renderBoard(player2Board, secondPlayer, true, false),
//     ],
//   },
// };
boardContainer.addEventListener("click", (e) => {
  if (gameState.turn === "Player 1 Turn") {
    if (
      e.target.closest(".board") === player2Board &&
      e.target.classList.contains("gridSquare")
    ) {
      console.log("clicked");
      handleBoardClick(e, firstPlayer, secondPlayer, player2Board, gameState);
    }
  } else if (gameState.turn === "Player 2 Turn") {
    if (
      e.target.closest(".board") === player1Board &&
      e.target.classList.contains("gridSquare")
    ) {
      handleBoardClick(e, secondPlayer, firstPlayer, player1Board, gameState);
    }
  }
  turnText.textContent = gameState.turn;
});

const footer = document.getElementsByClassName("footer")[0];
const displayBtn = footer.querySelector('[data-action="display"]');
const switchBtn = footer.querySelector('[data-action="switch"]');
const restartBtn = footer.querySelector('[data-action="restart"]');
footer.addEventListener("click", (e) => {
  console.log("State: ", gameState);
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
  }

  turnText.textContent = gameState.turn;

  if (e.target === restartBtn) {
    instructionCard.style.display = "block";
    turnCard.style.display = "none";
    resultCard.style.display = "none";
    resultText.textContent = "Planning next attack";
    gameState.turn = "Player 1 place ships";
    firstPlayer.resetGameboard();
    secondPlayer.resetGameboard();
    renderBoard(player1Board, firstPlayer, false, true);
    renderBoard(player2Board, secondPlayer, false, false);
  }
});
