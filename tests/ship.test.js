/// <reference types="jest" />

import Ship from "../src/logic/ship";


describe('Ship creation:', ()=>{

    test('Instantiate a carrier', () => {
  let carrier = new Ship('Carrier')
  expect(carrier.name).toBe('Carrier')
  expect(carrier.length).toBe(5)
})

test('Instantiate a battleship', () => {
  let battleship = new Ship('Battleship')
  expect(battleship.name).toBe('Battleship')
  expect(battleship.length).toBe(4)
})

test('Instantiate a cruiser', () => {
  let cruiser = new Ship('Cruiser')
  expect(cruiser.name).toBe('Cruiser')
  expect(cruiser.length).toBe(3)
})

test('Instantiate a submarine', () => {
  let submarine = new Ship('Submarine')
  expect(submarine.name).toBe('Submarine')
  expect(submarine.length).toBe(3)
})

test('Instantiate a destroyer', () => {
  let destroyer = new Ship('Destroyer')
  expect(destroyer.name).toBe('Destroyer')
  expect(destroyer.length).toBe(2)
})

test('Error with invalid type', ()=> {
    expect(()=>{new Ship('x')}).toThrow('Invalid Ship Type')
})

});