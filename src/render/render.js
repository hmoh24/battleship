import shipColors from "../assets/ships.js";

function render(boardDiv, player, clickableBoard, displayShips) {
  console.log("run");
  const gridSquares = [...boardDiv.childNodes].filter((element) => {
    return element.classList.contains("gridSquare");
  });

  player.gameboard.boardMatrix.flat().forEach((gridCode, index) => {
    let colour = colourGridSquare(gridCode);
    if (displayShips) gridSquares[index].style.backgroundColor = colour;
    else {
      if (gridCode === 0 || gridCode === 8 || gridCode === 9)
        gridSquares[index].style.backgroundColor = colour;
      else gridSquares[index].style.backgroundColor = "transparent";
    }
    gridSquares[index].classList.toggle("gridHover", clickableBoard);
  });
}

function colourGridSquare(code) {
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
    case 8:
      colour = "#000000";
      break;
    case 9:
      colour = "#FF0000";
      break;
    default:
      colour = "transparent";
      break;
  }
  return colour;
}

export default render;
