import Gameboard from '../gameboard.js';
import ShipFactory from '../ship.js';


describe('gameboard suite', () => {

  test('Gameboard place function is NOT undefined', () => {
    const ship = ShipFactory(2, 'horizontal');
    expect(Gameboard.placeShip(11, ship)).toBeDefined()
  });

test('Gameboard place function is producing array', () => {
    const ship = ShipFactory(2, 'horizontal');
    expect((Gameboard.placeShip(11, ship)).length).toBeGreaterThanOrEqual(1);
  });

test('Gameboard producing correct place coordinates HORIZONTAL 1', () => {
    const ship = ShipFactory(2, 'horizontal');
    expect(Gameboard.placeShip(11, ship)).toContain(11);
    expect(Gameboard.placeShip(11, ship)).toContain(12);
    expect(Gameboard.placeShip(11, ship).length).toBe(2);
  });

test('Gameboard producing correct place coordinates HORIZONTAL 2', () => {
    const ship = ShipFactory(4, 'horizontal');
    expect(Gameboard.placeShip(51, ship)).toContain(51);
    expect(Gameboard.placeShip(51, ship)).toContain(52);
    expect(Gameboard.placeShip(51, ship)).toContain(53);
    expect(Gameboard.placeShip(51, ship)).toContain(54);
    expect(Gameboard.placeShip(51, ship).length).toBe(4);
  });

test('Gameboard producing correct place coordinates VERTICAL 1', () => {
    const ship = ShipFactory(2, 'vertical');
    expect(Gameboard.placeShip(11, ship)).toContain(11);
    expect(Gameboard.placeShip(11, ship)).toContain(21);
    expect(Gameboard.placeShip(11, ship).length).toBe(2);
  });

test('Gameboard producing correct place coordinates VERTICAL 2', () => {
    const ship = ShipFactory(3, 'vertical');
    expect(Gameboard.placeShip(25, ship)).toContain(25);
    expect(Gameboard.placeShip(25, ship)).toContain(35);
    expect(Gameboard.placeShip(25, ship)).toContain(45);
    expect(Gameboard.placeShip(25, ship).length).toBe(3);
  });

test('Gameboard missed attack gettter is defined', () => {
    const ship = ShipFactory(3, 'vertical');
    Gameboard.placeShip(11, ship);
    expect(Gameboard.getMissedAttacks(11)).toBeDefined();
  });

test('Gameboard missed attack setter and getter producing right values', () => {
    const ship = ShipFactory(3, 'vertical');
    Gameboard.placeShip(11, ship);
    Gameboard.setMissedAttacks(21);
    Gameboard.setMissedAttacks(22);
    expect(Gameboard.getMissedAttacks()).toContain(21);
    expect(Gameboard.getMissedAttacks()).toContain(22);
    expect(Gameboard.getMissedAttacks().length).toBe(2);
  });
});

