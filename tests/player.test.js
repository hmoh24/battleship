/// <reference types="jest" />
import Player from "../src/logic/player";
import Gameboard from "../src/logic/gameBoard";

describe("Player", () => {
  let playerBob;
  let playerJim;
  let computerPlayer;

  beforeEach(() => {
    playerBob = new Player("Human", "Bob");
    playerJim = new Player("Human", "Jim");
    computerPlayer = new Player("Computer");
  });

  describe("constructor", () => {
    test("Instantiation", () => {
      expect(playerBob instanceof Player).toBe(true);
      expect(computerPlayer instanceof Player).toBe(true);
    });

    test("Setting player type to human", () => {
      expect(playerBob.type).toBe("Human");
    });

    test("Setting player type to computer", () => {
      expect(computerPlayer.type).toBe("Computer");
    });

    test("Setting player type to anything other than computer or player throws error", () => {
      expect(() => {
        let wrongTypePlayer = new Player("AI", "Bob");
      }).toThrow("Player types set to Human or Computer only.");
      expect(() => {
        new Player(123, "Bob");
      }).toThrow("Player types set to Human or Computer only.");
      expect(() => {
        new Player(null, "Bob");
      }).toThrow("Player types set to Human or Computer only.");
    });

    test("Setting player name to string of maximum 20 length throws error", () => {
      expect(() => {
        new Player("Human", null);
      }).toThrow("Player names must be string of maximum length of 20.");
    });

    test("Player objects are instantiated with their own gameboards", () => {
      expect(playerBob.gameboard instanceof Gameboard).toBe(true);
      expect(playerJim.gameboard instanceof Gameboard).toBe(true);
      expect(computerPlayer.gameboard instanceof Gameboard).toBe(true);
    });
  });
  describe("reset gameboard", () => {
    test("reset gameboard method creates a new gameboard object", () => {
      let board1 = playerBob.gameboard;
      playerBob.resetGameboard();
      expect(board1).not.toBe(playerBob.gameboard);
    });
  });
});
