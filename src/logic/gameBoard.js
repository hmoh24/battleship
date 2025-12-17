class Gameboard {
  constructor() {}

  static #contiguousCoordinatesChecker(coordinatesArray) {
    let contiguousHorizontal = true;
    let contiguousVertical = true;
    for (let i = 1; i < coordinatesArray.length; i++) {
      if (
        Math.abs(coordinatesArray[i][1] - coordinatesArray[i - 1][1]) !== 1 ||
        coordinatesArray[i][0] !== coordinatesArray[i - 1][0]
      )
        contiguousVertical = false;
      if (
        Math.abs(coordinatesArray[i][0] - coordinatesArray[i - 1][0]) !== 1 ||
        coordinatesArray[i][1] !== coordinatesArray[i - 1][1]
      )
        contiguousHorizontal = false;
    }
    return contiguousHorizontal || contiguousVertical;
  }

  //single coordinate check to reuse between shots and placing
  static #coordinateWithinBounds(coordinate) {
    let x = coordinate[0] >= 0 && coordinate[0] <= 9;
    let y = coordinate[1] >= 0 && coordinate[1] <= 9;
    return x && y;
  }

  place(ship, coordinatesArray) {
    //can instantiate ships here if necessary instead of passing them in
    //can then check
    if (
      coordinatesArray.some((coordinate) => {
        return !Gameboard.#coordinateWithinBounds(coordinate);
      })
    )
      throw new Error("Found coordinates out of bounds");
    if (ship.length !== coordinatesArray.length)
      throw new Error(
        `Wrong number of coordinates provided for ${ship.name}: Input:${coordinatesArray.length} Expected:${ship.length}`
      );
    if (!Gameboard.#contiguousCoordinatesChecker(coordinatesArray))
      throw new Error("Ship coordinates are not contiguous");
    return true;
  }

  receiveAttack() {
    //check if valid coordinates first
    //Keep list of attacks, only accept if it hasnt been done before - private property
    //
  }
}

export default Gameboard;

//data structure of 0,1,etc. 2d array
//this method is good because lookup is 0[1]

//simple method best for first pass, get it working
