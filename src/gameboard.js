import ShipFactory from './ship.js'

const Gameboard = () => ({
    place : (coordinate, ship) => {
        if (ship.orientation === 'horizontal'){
            let array = [];
            let finalCoordinate = coordinate + ship.length
            for (let i=coordinate; i<finalCoordinate; i++){
                array.push(i);
            }
            return array.values();
        }
    }
});

