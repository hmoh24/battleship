import Gameboard from '../gameboard.js';
import ShipFactory from '../ship.js';


test('Ship is placed horizontally', () => {
    const ship = ShipFactory(2, 'horizontal');
    expect((Gameboard().place(11, ship))).toBe(11, 12)
  });