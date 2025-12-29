/// <reference types="jest" />
import Gameboard from "../src/logic/gameBoard";
import Ship from "../src/logic/ship";

describe("Gameboard", () => {
  let board;

  beforeEach(() => {
    board = new Gameboard();
  });

  describe("constructor", () => {
    test("Instantiation", () => {
      expect(board instanceof Gameboard).toBe(true);
    });
  });

  describe("place", () => {
    test("Placing a ship in valid coords has no error", () => {
      const submarine = new Ship("Submarine");
      expect(() => {
        board.place(submarine, [
          [0, 0],
          [1, 0],
          [2, 0],
        ]);
      }).not.toThrow();
    });

    test("Valid ship placement returns true", () => {
      const battleship = new Ship("Battleship");
      const inputCoordinatesBShip = [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ];
      expect(board.place(battleship, inputCoordinatesBShip)).toBe(true);
    });

    test("Placing ships with less coordinates than ship length throws error", () => {
      const submarine = new Ship("Submarine");
      const inputCoordinates = [
        [0, 0],
        [1, 0],
      ];
      expect(() => {
        board.place(submarine, inputCoordinates);
      }).toThrow(
        `Wrong number of coordinates provided for ${submarine.name}: Input:${inputCoordinates.length} Expected:${submarine.length}`
      );

      const carrier = new Ship("Carrier");
      const inputCoordinatesCarrier = [
        [0, 0],
        [1, 0],
        [2, 0],
      ];
      expect(() => {
        board.place(carrier, inputCoordinatesCarrier);
      }).toThrow(
        `Wrong number of coordinates provided for ${carrier.name}: Input:${inputCoordinatesCarrier.length} Expected:${carrier.length}`
      );
    });

    test("Placing ships with more coordinates than ship length throws error", () => {
      const Cruiser = new Ship("Cruiser");
      const inputCoordinates = [
        [0, 0],
        [1, 0],
      ];
      expect(() => {
        board.place(Cruiser, inputCoordinates);
      }).toThrow(
        `Wrong number of coordinates provided for ${Cruiser.name}: Input:${inputCoordinates.length} Expected:${Cruiser.length}`
      );

      const carrier = new Ship("Carrier");
      const inputCoordinatesCarrier = [
        [0, 0],
        [1, 0],
        [2, 0],
      ];
      expect(() => {
        board.place(carrier, inputCoordinatesCarrier);
      }).toThrow(
        `Wrong number of coordinates provided for ${carrier.name}: Input:${inputCoordinatesCarrier.length} Expected:${carrier.length}`
      );
    });

    test("Placing non-contiguous coordinates throws error", () => {
      const Cruiser = new Ship("Cruiser");
      const inputCoordinates = [
        [0, 0],
        [1, 0],
        [3, 0],
      ];
      expect(() => {
        board.place(Cruiser, inputCoordinates);
      }).toThrow("Ship coordinates are not contiguous");

      const battleship = new Ship("Battleship");
      const inputCoordinatesBShip = [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 3],
      ];
      expect(() => {
        board.place(battleship, inputCoordinatesBShip);
      }).toThrow("Ship coordinates are not contiguous");

      const carrier = new Ship("Carrier");
      const carrierCoords = [
        [0, 1],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 3],
      ];
      expect(() => {
        board.place(carrier, carrierCoords);
      }).toThrow("Ship coordinates are not contiguous");
    });

    test("Placing ship on coordinates out of bounds throws error", () => {
      const Cruiser = new Ship("Cruiser");
      const inputCoordinates = [
        [8, 0],
        [9, 0],
        [10, 0],
      ];
      expect(() => {
        board.place(Cruiser, inputCoordinates);
      }).toThrow("Found coordinates out of bounds");

      const battleship = new Ship("Battleship");
      const battleshipCoords = [
        [0, 7],
        [0, 8],
        [0, 9],
        [0, 10],
      ];
      expect(() => {
        board.place(battleship, battleshipCoords);
      }).toThrow("Found coordinates out of bounds");

      const carrier = new Ship("Carrier");
      const carrierCoords = [
        [-1, 2],
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ];
      expect(() => {
        board.place(carrier, carrierCoords);
      }).toThrow("Found coordinates out of bounds");
    });

    test("Placing ship on top of existing ship throws error", () => {
      const battleship = new Ship("Battleship");
      const inputCoordinatesBShip = [
        [0, 2],
        [1, 2],
        [2, 2],
        [3, 2],
      ];
      board.place(battleship, inputCoordinatesBShip);
      const Cruiser = new Ship("Cruiser");
      const inputCoordinates = [
        [3, 2],
        [4, 2],
        [5, 2],
      ];
      expect(() => {
        board.place(Cruiser, inputCoordinates);
      }).toThrow("Cannot place ship where ship is already placed");
    });

    test("Placing duplicate ship in valid coordinates throws error", () => {
      const Cruiser = new Ship("Cruiser");
      const inputCoordinates = [
        [3, 2],
        [4, 2],
        [5, 2],
      ];
      board.place(Cruiser, inputCoordinates);
      const secondCruiser = new Ship("Cruiser");
      const secondCoords = [
        [5, 5],
        [6, 5],
        [7, 5],
      ];
      expect(() => {
        board.place(secondCruiser, secondCoords);
      }).toThrow(
        `Cannot place second ship of any type. Issue found with ${secondCruiser.name}`
      );
    });
  });

  describe("receiveAttack", () => {
    beforeEach(() => {
      board = new Gameboard();
    });

    test("Attack on invalid coordinates throws error", () => {
      expect(() => {
        board.receiveAttack([10, 100]);
      }).toThrow("Attack out of bounds");
    });

    test("Attack on valid coordinates and miss returns string message", () => {
      expect(board.receiveAttack([0, 1])).toBe("Missed!");
    });

    test("Repeated attack on same square throws error", () => {
      board.receiveAttack([2, 3]);
      expect(() => {
        board.receiveAttack([2, 3]);
      }).toThrow("Cannot make an attack on the previously hit tile.");
    });

    test("Attack on tile with ship returns string message", () => {
      const destroyer = new Ship("Destroyer");
      board.place(destroyer, [
        [5, 5],
        [6, 5],
      ]);
      expect(board.receiveAttack([5, 5])).toBe("Successful hit!");
    });

    test("Successful attacks on ship result in sinking and string message", () => {
      const destroyer = new Ship("Destroyer");
      board.place(destroyer, [
        [5, 5],
        [6, 5],
      ]);
      board.receiveAttack([6, 5]);
      expect(board.receiveAttack([5, 5])).toBe("Successful hit!");
      expect(destroyer.isSunk()).toBe(true);
    });

    test("Get coordinates of all attacks", () => {
      board.receiveAttack([6, 5]);
      board.receiveAttack([5, 3]);

      expect(board.previousAttacks).toBe("6,5-5,3");
    });
  });

  describe("allShipsSunk", () => {
    beforeEach(() => {
      board = new Gameboard();
    });

    test("Empty gameboard results in false", () => {
      expect(board.allShipsSunk()).toBe(false);
    });

    test("Receiving attacks that sink single ship results in true", () => {
      const destroyer = new Ship("Destroyer");
      board.place(destroyer, [
        [5, 5],
        [6, 5],
      ]);
      board.receiveAttack([6, 5]);
      board.receiveAttack([5, 5]);
      expect(board.allShipsSunk()).toBe(true);
    });

    test("Receiving attacks that DON'T sink single ship results in false", () => {
      const destroyer = new Ship("Destroyer");
      board.place(destroyer, [
        [5, 5],
        [6, 5],
      ]);
      board.receiveAttack([6, 5]);
      board.receiveAttack([7, 5]);
      expect(board.allShipsSunk()).toBe(false);
    });

    test("Receiving attacks that sink multiple ships results in true", () => {
      const carrier = new Ship("Carrier");
      const battleship = new Ship("Battleship");
      const cruiser = new Ship("Cruiser");
      const submarine = new Ship("Submarine");
      const destroyer = new Ship("Destroyer");

      board.place(carrier, [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);

      board.place(battleship, [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ]);

      board.place(cruiser, [
        [4, 0],
        [4, 1],
        [4, 2],
      ]);

      board.place(submarine, [
        [6, 0],
        [6, 1],
        [6, 2],
      ]);

      board.place(destroyer, [
        [8, 0],
        [8, 1],
      ]);

      [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
        [4, 0],
        [4, 1],
        [4, 2],
        [6, 0],
        [6, 1],
        [6, 2],
        [8, 0],
        [8, 1],
      ].forEach((coord) => board.receiveAttack(coord));

      expect(board.allShipsSunk()).toBe(true);
    });
    test("Receiving attacks that do not sink multiple ships results in false", () => {
      const carrier = new Ship("Carrier");
      const battleship = new Ship("Battleship");
      const cruiser = new Ship("Cruiser");
      const submarine = new Ship("Submarine");
      const destroyer = new Ship("Destroyer");

      board.place(carrier, [
        [0, 0],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
      ]);

      board.place(battleship, [
        [2, 0],
        [2, 1],
        [2, 2],
        [2, 3],
      ]);

      board.place(cruiser, [
        [4, 0],
        [4, 1],
        [4, 2],
      ]);

      board.place(submarine, [
        [6, 0],
        [6, 1],
        [6, 2],
      ]);

      board.place(destroyer, [
        [8, 0],
        [8, 1],
      ]);

      [
        [0, 5],
        [0, 1],
        [0, 2],
        [0, 3],
        [0, 4],
        [2, 0],
        [2, 1],
        [9, 9],
        [2, 3],
        [4, 0],
        [4, 1],
        [6, 7],
        [6, 0],
        [6, 1],
        [6, 2],
        [8, 0],
        [8, 1],
      ].forEach((coord) => board.receiveAttack(coord));

      expect(board.allShipsSunk()).toBe(false);
    });
  });
  describe("randomisedCoordinates", () => {
    beforeEach(() => {
      board = new Gameboard();
    });

    test("Can generate coordinates for destroyer", () => {
      let destroyer = new Ship("Destroyer");
      let coordsDestroyer = board.randomiseCoordinates(destroyer);
      expect(board.place(destroyer, coordsDestroyer)).toBe(true);
    });

    test("Can generate coordinates for two ships of different length", () => {
      let destroyer = new Ship("Destroyer");
      let cruiser = new Ship("Cruiser");
      let coordsDestroyer = board.randomiseCoordinates(destroyer);
      expect(board.place(destroyer, coordsDestroyer)).toBe(true);

      let coordsCruiser = board.randomiseCoordinates(cruiser);
      expect(board.place(cruiser, coordsCruiser)).toBe(true);
    });

    test("Can generate coordinates for a full board of ships", () => {
      const ships = [
        new Ship("Carrier"),
        new Ship("Battleship"),
        new Ship("Cruiser"),
        new Ship("Submarine"),
        new Ship("Destroyer"),
      ];

      ships.forEach((ship) => {
        const coords = board.randomiseCoordinates(ship);
        expect(board.place(ship, coords)).toBe(true);
      });
    });
  });
});
