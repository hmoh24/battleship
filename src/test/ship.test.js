import ShipFactory from '../ship.js';

test('Ship has length', () => {
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
  expect(ship.hit('F1')).toBe('F1 hit');
});

test('Ship can calculate if sunk', () => {
  const ship = ShipFactory(3, 'vertical');
  const hitPositions = 3
  expect(ship.isSunk(hitPositions)).toBe(true);
});


test('Ship can calculate if NOT sunk', () => {
  const ship = ShipFactory(3, 'vertical');
  const hitPositions = 1
  expect(ship.isSunk(hitPositions)).toBe(false);
});