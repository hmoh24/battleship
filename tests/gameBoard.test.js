/// <reference types="jest" />
import Gameboard from "../src/logic/gameBoard";
import Ship from "../src/logic/ship";

describe("Gameboard", () => {
  test("Instantiation", () => {
    const board = new Gameboard();
    expect(board instanceof Gameboard).toBe(true);
  });

  test("Placing a ship in valid coords has no error", () => {
    const board = new Gameboard();
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
    const board = new Gameboard();
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
    const board = new Gameboard();
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
    const board = new Gameboard();
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
    const board = new Gameboard();
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
    const board = new Gameboard();
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
    const board = new Gameboard();
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
});
