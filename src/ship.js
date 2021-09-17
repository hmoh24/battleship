const ShipFactory = (length, orientation) => ({
    length,
    orientation,
    coordinates : [],
    hit : (position) => {
        return `${position} hit`
    },
    isSunk : (hitPositions) => {
        let sunk;
        if (hitPositions===length){
           return sunk = true
        }
        else {
            return sunk = false
        };
    }
});




export default ShipFactory