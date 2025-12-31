import renderBoard from "./renderBoard.js";
const resultText = document.querySelector(".result-text");
const turnText = document.querySelector(".turn-text");

function makeComputerTurn(
  humanPlayer,
  computerPlayer,
  humanboard,
  computerboard,
  gamestate
) {
  function step() {
    const result = humanPlayer.gameboard.randomAttack();
    setTimeout(() => {
      renderBoard(humanboard, humanPlayer, false, true);
      resultText.textContent = result;
      if (result !== "Missed!") {
        step();
        return;
      }
      turnText.textContent = "Player 1 Turn";
      resultText.textContent = "Waiting for attack!";
      renderBoard(computerboard, computerPlayer, true, false);
      gamestate.state = "Player 1 Turn";
    }, 1000);
  }

  step();
}

export { makeComputerTurn };
