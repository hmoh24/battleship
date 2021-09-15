const ShipFactory = (length, orientation) => ({
    length,
    orientation,
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