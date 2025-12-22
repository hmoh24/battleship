class Gameboard {
  constructor() {}

  #coordinatesMatrix = Array.from({ length: 10 }, () =>
    Array.from({ length: 10 }, () => 0)
  );

  #previousAttacks = new Set();
  #shipsPlaced = new Map();

  static #shipCodes = {
    Carrier: 1,
    Battleship: 2,
    Cruiser: 3,
    Submarine: 4,
    Destroyer: 5,
  };

  static #getShipNameByCode(code) {
    const codes = Object.entries(Gameboard.#shipCodes);
    for (const [key, val] of codes) {
      if (code === val) return key;
    }
  }

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

  static #coordinateWithinBounds(coordinate) {
    let x = coordinate[0] >= 0 && coordinate[0] <= 9;
    let y = coordinate[1] >= 0 && coordinate[1] <= 9;
    return x && y;
  }

  place(ship, coordinatesArray) {
    //can instantiate ships here if necessary instead of passing them in
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
    if (
      coordinatesArray.some((coordinate) => {
        return this.#coordinatesMatrix[coordinate[1]][coordinate[0]] !== 0;
      })
    )
      throw new Error('Cannot place ship where ship is already placed"');
    if (this.#shipsPlaced.has(ship.name))
      throw new Error(
        `Cannot place second ship of any type. Issue found with ${ship.name}`
      );
    coordinatesArray.forEach((coordinate) => {
      this.#coordinatesMatrix[coordinate[1]][coordinate[0]] =
        Gameboard.#shipCodes[ship.name];
    });
    this.#shipsPlaced.set(ship.name, ship);
    return true;
  }

  receiveAttack(coordinatesArray) {
    if (!Gameboard.#coordinateWithinBounds(coordinatesArray))
      throw new Error("Attack out of bounds");
    if (this.#previousAttacks.has(coordinatesArray.toString()))
      throw new Error("Cannot make an attack on the previously hit tile.");

    const shipCode =
      this.#coordinatesMatrix[coordinatesArray[1]][coordinatesArray[0]];
    this.#previousAttacks.add(coordinatesArray.toString());

    if (shipCode !== 0) {
      const ship = this.#shipsPlaced.get(
        Gameboard.#getShipNameByCode(shipCode)
      );
      ship.hit();
      return "Successful hit!";
    } else {
      return "Missed!";
    }
  }

  get previousAttacks() {
    //store the array, make comparison with .tostring, so that on the DOM we can use it to highlight the right tiles.
    return [...this.#previousAttacks].join("-").toString();
  }

  allShipsSunk() {
    if (this.#shipsPlaced.size === 0) return false;
    for (const ship of this.#shipsPlaced.values()) {
      if (ship.isSunk() === false) return false;
    }
    return true;
  }

  //remove after functionality for placing ships
  get boardMatrix() {
    return this.#coordinatesMatrix.flat();
  }
}

export default Gameboard;

//data structure of 0,1,etc. 2d array
//this method is good because lookup is 0[1]

//simple method best for first pass, get it working
const board = new Gameboard();
