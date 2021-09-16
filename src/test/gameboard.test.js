import Gameboard from '../gameboard.js';
import ShipFactory from '../ship.js';


test('Gameboard place function is producing coordinates', () => {
    const ship = ShipFactory(2, 'horizontal');
    expect((Gameboard().place(11, ship))).toBeDefined()
  });

  test('Gameboard producing correct place coordinates', () => {
    expect(
      (Gameboard().place(11, 12)).includes(11) &&
      (Gameboard().place(11, 13)).includes(12)
      .toBe(true))
  });
