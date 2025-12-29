import Gameboard from "./gameBoard.js";

class Player {
  #type;
  #name;
  #gameboard;
  constructor(type, name = "Default") {
    if (!["Computer", "Human"].includes(type))
      throw new Error("Player types set to Human or Computer only.");
    if (typeof name !== "string" || name.length > 20)
      throw new Error("Player names must be string of maximum length of 20.r");
    this.#type = type;
    this.#name = name;
    this.#gameboard = new Gameboard();
  }

  get name() {
    return this.#name;
  }

  get type() {
    return this.#type;
  }

  get gameboard() {
    return this.#gameboard;
  }

  resetGameboard() {
    this.#gameboard = new Gameboard();
  }
}

export default Player;
