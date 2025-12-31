function generateGrid(boards) {
  boards.forEach((div) => {
    for (let i = 0; i < 100; i++) {
      let gridSquare = document.createElement("div");
      gridSquare.classList.add("gridSquare");
      gridSquare.setAttribute("data-coord", `${i % 10}${Math.floor(i / 10)}`);
      div.appendChild(gridSquare);
    }
  });
}

export { generateGrid };
