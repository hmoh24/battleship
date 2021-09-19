import ShipFactory from './ship.js'

const Gameboard = (() => {
    let placeShip = (coordinate, ship) => {
        let returnedCoordinates = [];
        function createPlacedCoord(min, max, factor, array){
            for (let i=min; i<max; i+=factor){
                array.push(i);
            }
        };
        if (ship.orientation === 'horizontal'){
            let finalCoordinate = coordinate + ship.length;
            createPlacedCoord(coordinate, finalCoordinate, 1, returnedCoordinates);
        };
        if (ship.orientation === 'vertical'){
            let finalCoordinate = coordinate + ship.length*10;
            createPlacedCoord(coordinate, finalCoordinate, 10, returnedCoordinates);
        };
        return returnedCoordinates;
    };
    let missedAttacks = [];
    const setMissedAttacks = (coordinates) => {
        missedAttacks.push(coordinates);
    };
    const getMissedAttacks = () => {
        return missedAttacks
    };
    return {
        placeShip,
        getMissedAttacks,
        setMissedAttacks
    }
})();



export default Gameboard