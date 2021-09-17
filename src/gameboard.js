import ShipFactory from './ship.js'

const Gameboard = () => ({
    place : (coordinate, ship) => {
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
    },
    recieveAttack : (coordinates) => {
        // Object.defineProperty(Gameboard(), "missedAttack", {
        //     get : function () { return missedAttack; },
        //     set : function(coorindates) { missedAttack.push(coordinates)}
        // })
        Gameboard().missedAttack[(Gameboard().missedAttack).length] = coordinates;
        console.log(Gameboard().missedAttack);
        return coordinates;
    },
    missedAttack : [],

});


export default Gameboard