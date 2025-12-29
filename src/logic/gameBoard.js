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
      //set matrix code to 9 when hit to set red colour
      this.#coordinatesMatrix[coordinatesArray[1]][coordinatesArray[0]] = 9;
      ship.hit();
      return "Successful hit!";
    } else {
      //set matrix code to 8 when miss to set black colour
      this.#coordinatesMatrix[coordinatesArray[1]][coordinatesArray[0]] = 8;
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

  // do not run consecutively for many ships, place ship before running again for another
  randomiseCoordinates(ship) {
    const isCoordinateEmpty = (array) => {
      let [x, y] = array;
      if (this.#coordinatesMatrix[y][x] === undefined) {
        console.log(array);
        console.log(ship.name);
      }
      return this.#coordinatesMatrix[y][x] === 0;
    };

    function findRandomEmptyCoord() {
      let randomX = Math.floor(Math.random() * 10);
      let randomY = Math.floor(Math.random() * 10);
      while (!isCoordinateEmpty([randomX, randomY])) {
        randomY = Math.floor(Math.random() * 10);
        randomX = Math.floor(Math.random() * 10);
      }
      return [randomX, randomY];
    }
    function contiguousCoordinatesAllDirections(shipLength, startPoint) {
      let [x, y] = startPoint;
      let horizontalPositive = [startPoint];
      let horizontalNegative = [startPoint];
      let verticalPositive = [startPoint];
      let verticalNegative = [startPoint];
      let continueHPve = true;
      let continueHNve = true;
      let continueVPve = true;
      let continueVNve = true;
      let returnArray = [];
      // 1 index to start addition from 1, exclusive of length cos we already start with one coord
      for (let i = 1; i < shipLength; i++) {
        if (continueHPve) {
          //coordinate within bounds check first to early exit to prevent error with out of bounds check on is coordinate empty
          if (
            !Gameboard.#coordinateWithinBounds([x + i, y]) ||
            !isCoordinateEmpty([x + i, y])
          ) {
            continueHPve = false;
          } else {
            horizontalPositive.push([x + i, y]);
          }
        }
        if (continueHNve) {
          if (
            !Gameboard.#coordinateWithinBounds([x - i, y]) ||
            !isCoordinateEmpty([x - i, y])
          ) {
            continueHNve = false;
          } else {
            horizontalNegative.push([x - i, y]);
          }
        }
        if (continueVPve) {
          if (
            !Gameboard.#coordinateWithinBounds([x, y + i]) ||
            !isCoordinateEmpty([x, y + i])
          ) {
            continueVPve = false;
          } else {
            verticalPositive.push([x, y + i]);
          }
        }
        if (continueVNve) {
          if (
            !Gameboard.#coordinateWithinBounds([x, y - i]) ||
            !isCoordinateEmpty([x, y - i])
          ) {
            continueVNve = false;
          } else {
            verticalNegative.push([x, y - i]);
          }
        }
      }
      continueHPve ? returnArray.push(horizontalPositive) : null;
      continueHNve ? returnArray.push(horizontalNegative) : null;
      continueVPve ? returnArray.push(verticalPositive) : null;
      continueVNve ? returnArray.push(verticalNegative) : null;
      return returnArray;
    }

    let start = findRandomEmptyCoord();
    let coordinatesAllDirections = contiguousCoordinatesAllDirections(
      ship.length,
      start
    );

    while (coordinatesAllDirections.length === 0) {
      start = findRandomEmptyCoord();
      contiguousCoordinatesAllDirections(ship.length, start);
    }
    //randomly select the valid coordinate direction to prevent bias for horizontal vs vertical
    let selectionIndex = Math.floor(
      Math.random() * coordinatesAllDirections.length
    );
    return coordinatesAllDirections[selectionIndex];
  }
}

export default Gameboard;

//data structure of 0,1,etc. 2d array
//this method is good because lookup is 0[1]

//simple method best for first pass, get it working
const board = new Gameboard();
