/// <reference types="jest" />
import Gameboard from "../src/logic/gameBoard"
import Ship from "../src/logic/ship";

describe('Gameboard', ()=> {
    test('Instantiation', ()=>{
        const board = new Gameboard();
        expect(board instanceof Gameboard).toBe(true);
    })

    test('Placing a ship in valid coords has no error', ()=> {
        const board = new Gameboard();
        const submarine = new Ship('Submarine');
        expect(board.place(submarine, [[0, 0], [1, 0], [2, 0]])).not.toThrow()
    })

})