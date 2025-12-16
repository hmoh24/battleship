class Ship{
    static #shipMap = {
        Carrier: {
            name: 'Carrier',
            length: 5
        },
        Battleship: {
            name: 'Battleship',
            length: 4
        },
        Cruiser: {
            name: 'Cruiser',
            length: 3
        },
        Submarine: {
            name: 'Submarine',
            length: 3
        },
        Destroyer: {
            name: 'Destroyer',
            length: 2
        }
    };
    static #shipTypes = Object.keys(this.#shipMap);
    #hits

    constructor(type){
        if(!Ship.#shipTypes.includes(type)) throw new Error('Invalid Ship Type')
        this.name = Ship.#shipMap[type].name
        this.length = Ship.#shipMap[type].length
        this.#hits = 0;
    }

    isSunk(){
        return this.#hits >= this.length
    }

    hit(){
        if (this.isSunk()) throw new Error('Ship has already sunk.')
        this.#hits++
    }
}

export default Ship

