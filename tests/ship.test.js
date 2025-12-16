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
    expect(()=>{new Ship('carrir')}).toThrow('Invalid Ship Type')
    expect(()=>{new Ship()}).toThrow('Invalid Ship Type')
    expect(()=>{new Ship(0)}).toThrow('Invalid Ship Type')
})

});

describe('Ship hit and sink:', ()=>{
    test('Ship is not sunk on creation', ()=>{
        let carrier  = new Ship('Carrier')
        let destroyer = new Ship('Destroyer')
        let cruiser = new Ship('Cruiser')

        expect(carrier.isSunk()).toBe(false)
        expect(destroyer.isSunk()).toBe(false)
        expect(cruiser.isSunk()).toBe(false)
    })

    test('Ship sinks after sufficient hits', ()=>{
        let destroyer = new Ship('Destroyer')
        destroyer.hit()
        destroyer.hit()
        expect(destroyer.isSunk()).toBe(true)

        let carrier  = new Ship('Carrier')
        carrier.hit()
        carrier.hit()
        carrier.hit()
        carrier.hit()
        carrier.hit()
        expect(carrier.isSunk()).toBe(true)
    })

    test('Hits on sunk ships throws error message', ()=>{
        let destroyer = new Ship('Destroyer')
        destroyer.hit()
        destroyer.hit()
        expect(()=>{destroyer.hit()}).toThrow('Ship has already sunk.')

        let submarine = new Ship('Submarine')
        submarine.hit()
        submarine.hit()
        submarine.hit()
        expect(()=>{submarine.hit()}).toThrow('Ship has already sunk.')

    })
})