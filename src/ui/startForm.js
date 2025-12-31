import Player from "../logic/player.js";
const startForm = document.querySelector(".startCard");
const modeButtons = startForm.querySelectorAll(".modeButton");
const player1NameInput = startForm.querySelector("#player1Name");
const player2NameInput = startForm.querySelector("#player2Name");
const boardPage = document.querySelector(".boardsDisplay");
const turnCard = document.querySelector(".turn-card");
const resultCard = document.querySelector(".result-card");
const instructionText = document.querySelector(".instruction-text");

function buttonSwitch(event) {
  const btn = event.target.closest(".modeButton");
  if (btn) {
    modeButtons.forEach((button) =>
      button.classList.remove("modeButtonSelected")
    );
    btn.classList.add("modeButtonSelected");
  }
}

function createPlayers() {
  const selected = startForm.querySelector(".modeButtonSelected");
  let player2Type = selected.dataset.mode;
  const player1Name = player1NameInput.value.trim();
  const player2Name = player2NameInput.value.trim();
  let player1 = new Player("Human", player1Name);
  let player2 = new Player(player2Type, player2Name);
  return [player1, player2];
}

function startFormUIUpdate(player1, player2) {
  startForm.style.display = "none";
  boardPage.style.display = "block";
  turnCard.style.display = "none";
  resultCard.style.display = "none";
  let additionalText =
    player2.type === "Computer"
      ? ""
      : `${player2.name}, leave the screen. ${player1.name} -`;
  instructionText.textContent = `${additionalText} Place ships by: using the randomiser, or placing via the input below. Any placed ships can be moved by selecting them from the dropdown below and placing valid coordinates. [0, 0] is the top left, and [9, 9] is the bottom right.`;
}

export { buttonSwitch, createPlayers, startFormUIUpdate };
