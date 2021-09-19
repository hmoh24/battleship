import Gameboard from '../gameboard.js';
import ShipFactory from '../ship.js';

describe('ship suite', () => {test('Ship has length', () => {
  const ship = ShipFactory(1, 'horizontal');
  expect(ship.length).toBeGreaterThan(0)
});

test('Ship has correct length', () => {
  const ship = ShipFactory(2, 'horizontal');
  expect(ship.length).toBe(2)
});


test('Ship has orientation', () => {
  const ship = ShipFactory(1, 'horizontal');
  expect(ship.orientation).toBeDefined();
});

test('Ship has correct orientation', () => {
  const ship = ShipFactory(1, 'vertical');
  expect(ship.orientation).toBe('vertical');
});


test('Ship can return hit location', () => {
  const ship = ShipFactory(1, 'vertical');
  expect(ship.hit(11)).toBe('11 hit');
});

test('Ship can calculate if sunk', () => {
  const ship = ShipFactory(3, 'vertical');
  const hitPositions = true
  ship.checkIfSunk(hitPositions)
  expect(ship.getSunk()).toBe(true);
});


test('Ship can calculate if NOT sunk', () => {
  const ship = ShipFactory(3, 'vertical');
  const hitPositions = false
  ship.checkIfSunk(hitPositions)
  expect(ship.getSunk()).toBe(false);
});

test('Ship has coordinates', () => {
  const ship = ShipFactory(3, 'vertical');
  expect(ship.coordinates).toBeDefined();
});

test('Ship coordinates same as Gameboard calculated coordinates', () => {
  const ship = ShipFactory(3, 'horizontal');
  ship.coordinates = Gameboard.placeShip(11, ship);
  expect(ship.coordinates).toEqual(Gameboard.placeShip(11, ship));
})
});