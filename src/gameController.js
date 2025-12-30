import Ship from "./logic/ship.js";
import Gameboard from "./logic/gameBoard.js";
import Player from "./logic/player.js";
import render from "./render/render.js";

let firstPlayer;
let player1Type = "Human";
let secondPlayer;
let player2Type;
let gameState = "Start";

const startForm = document.querySelector(".startCard");
const boardPage = document.querySelector(".boardsDisplay");
const modeButtons = startForm.querySelectorAll(".modeButton");
const player1NameInput = startForm.querySelector("#player1Name");
const player2NameInput = startForm.querySelector("#player2Name");
const instructionForm = document.querySelector(".instruction-card");
const shipSelect = instructionForm.querySelector("#shipSelect");
const shipCoordsInput = instructionForm.querySelector("#shipCoords");
// Set selected option: shipSelect.value = "Carrier"

const boardElements = [...document.getElementsByClassName("board")];
const [player1Board, player2Board] = boardElements;
const player1BoardTitle = player1Board
  .closest(".board-shell")
  .querySelector("h3");
const player2BoardTitle = player1Board
  .closest(".board-shell")
  .querySelector("h3");
const boardContainer = document.getElementsByClassName("boards")[0];

//info section
const turnCard = document.querySelector(".turn-card");
const resultCard = document.querySelector(".result-card");
const instructionCard = document.querySelector(".instruction-card");
const turnText = document.querySelector(".turn-text");
const resultText = document.querySelector(".result-text");
const instructionText = document.querySelector(".instruction-text");

boardElements.forEach((div) => {
  for (let i = 0; i < 100; i++) {
    let gridSquare = document.createElement("div");
    gridSquare.classList.add("gridSquare", "gridHover");
    gridSquare.setAttribute("data-coord", `${i % 10}${Math.floor(i / 10)}`);
    div.appendChild(gridSquare);
  }
});

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
  if (gameState !== "Start") {
    alert("Game state is incorrect for this function, refresh to fix.");
  } else {
    e.preventDefault();
    const selected = startForm.querySelector(".modeButtonSelected");
    player2Type = selected.dataset.mode;
    const player1Name = player1NameInput.value.trim();
    const player2Name = player2NameInput.value.trim();
    try {
      firstPlayer = new Player(player1Type, player1Name);
      secondPlayer = new Player(player2Type, player2Name);
      console.log(firstPlayer, secondPlayer);
      startForm.style.display = "none";
      boardPage.style.display = "block";
      turnCard.style.display = "none";
      resultCard.style.display = "none";
      instructionText.textContent = `${player2Name}, leave the screen. ${player1Name} - Place ships by: using the randomiser, or placing via the input below. Any placed ships can be moved by selecting them from the dropdown below and placing valid coordinates. [0, 0] is the top left, and [9, 9] is the bottom right.`;
      gameState = "Player 1 place ships";
    } catch (e) {
      alert(e.message);
    }
  }
});

const randomiseBtn = document.querySelector('[data-action="randomise"]');
randomiseBtn.addEventListener("click", () => {
  //check for valid game states
  let player;
  let board;
  if (
    gameState === "Player 1 place ships" ||
    gameState === "Player 2 place ships"
  ) {
    [player, board] =
      gameState === "Player 1 place ships"
        ? [firstPlayer, player1Board]
        : [secondPlayer, player2Board];

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
    render(board, player, true, true);
  }
});

//fix with game state
//check for game state for both in one if block, then ternary to assign right variable for player 1 vs 2
instructionForm.addEventListener("submit", (e) => {
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
      ? [firstPlayer, player1Board]
      : [secondPlayer, player2Board];

  try {
    const ship = new Ship(shipType);
    player.gameboard.replace(ship, coords);
    render(board, player, false, true);
  } catch (err) {
    alert(err.message);
  }
});

//OPTIMISATION - make a map to handle event handler logic cleanly
// let turnLogic = {
//   player1: {
//     boardRender: [
//       render(player1Board, firstPlayer, false, true),
//       render(player2Board, secondPlayer, true, false),
//     ],
//   },
// };
boardContainer.addEventListener("click", (e) => {
  console.log("State: ", gameState);

  if (gameState === "Player 1 Turn") {
    if (
      e.target.closest(".board") === player2Board &&
      e.target.classList.contains("gridSquare")
    ) {
      const coordStringArray = e.target.dataset["coord"].split("");
      const coordNumericArray = coordStringArray.map(Number);
      let resultString =
        secondPlayer.gameboard.receiveAttack(coordNumericArray);
      console.log(resultString);
      resultText.textContent = resultString;
      if (resultString === "Missed!") {
        render(player2Board, secondPlayer, false, false);
        gameState = "Switch 1-2";
      } else {
        render(player2Board, secondPlayer, true, false);
        if (secondPlayer.gameboard.allShipsSunk()) {
          alert(`${firstPlayer.name} wins!!`);
          gameState = "Player 1 Win!";
          turnText.textContent = gameState;
          render(player2Board, secondPlayer, false, false);
        }
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
      resultText.textContent = resultString;
      if (resultString === "Missed!") {
        render(player1Board, firstPlayer, false, false);
        gameState = "Switch 2-1";
      } else {
        render(player1Board, firstPlayer, true, false);
        if (firstPlayer.gameboard.allShipsSunk()) {
          alert(`${secondPlayer.name} wins!!`);
          gameState = "Player 2 Win!";
          turnText.textContent = gameState;
          render(player1Board, firstPlayer, false, false);
        }
      }
    }
  }
  turnText.textContent = gameState;
});

const footer = document.getElementsByClassName("footer")[0];
const displayBtn = footer.querySelector('[data-action="display"]');
const switchBtn = footer.querySelector('[data-action="switch"]');
const restartBtn = footer.querySelector('[data-action="restart"]');
footer.addEventListener("click", (e) => {
  console.log("State: ", gameState);
  if (
    e.target === switchBtn &&
    (gameState === "Player 1 place ships" ||
      gameState === "Player 2 place ships")
  ) {
    if (
      (gameState = "Player 1 place ships") &&
      firstPlayer.gameboard.allShipsPlaced()
    ) {
      gameState = "Player 2 place ships";
      instructionText.textContent = `${firstPlayer.name}, leave the screen. ${secondPlayer.name} - Place ships by: using the randomiser, or placing via the input below. Any placed ships can be moved by selecting them from the dropdown below and placing valid coordinates. [0, 0] is the top left, and [9, 9] is the bottom right.`;
    }
    if (
      (gameState = "Player 2 place ships") &&
      secondPlayer.gameboard.allShipsPlaced()
    ) {
      gameState = "Display 2-1";
      instructionCard.style.display = "none";
      turnCard.style.display = "block";
      resultCard.style.display = "block";
    }
    render(player1Board, firstPlayer, false, false);
    render(player2Board, secondPlayer, false, false);
  }
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
      resultText.textContent = "Planning next attack";
      console.log("after click", gameState);
    }
    if (gameState === "Display 2-1") {
      render(player1Board, firstPlayer, false, true);
      render(player2Board, secondPlayer, true, false);
      gameState = "Player 1 Turn";
      resultText.textContent = "Planning next attack";
      console.log("after click", gameState);
    }
  }
  turnText.textContent = gameState;
  if (e.target === restartBtn) {
    instructionCard.style.display = "block";
    turnCard.style.display = "none";
    resultCard.style.display = "none";
    resultText.textContent = "Planning next attack";
    gameState = "Player 1 place ships";
    firstPlayer.resetGameboard();
    secondPlayer.resetGameboard();
    render(player1Board, firstPlayer, false, true);
    render(player2Board, secondPlayer, false, false);
  }
});
