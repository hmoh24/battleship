import ShipFactory from './ship.js'

const Gameboard = () => ({
    place : (coordinate, ship) => {
        if (ship.orientation === 'horizontal'){
            let finalCoordinate = coordinate + ship.length;
            returnPlacedCoordinates(coordinate, finalCoordinate)
        }
        return returnedCoordinates;
    },
    returnPlacedCoordinates : (coordinate, finalCoordinate) => {
        let returnedCoordinates = [];
        for (let i=coordinate; i<=finalCoordinate; i++){
            returnedCoordinates.push(i);
        }
        return returnedCoordinates
    }
});

Gameboard().returnPlacedCoordinates(11,14);

export default Gameboard