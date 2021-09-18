const ShipFactory = (length, orientation) => {
    let coordinates = [];
    const hit = (position) => {
        return `${position} hit`
    };
    let sunk;
    const getSunk = () => {
        return sunk
    };
    const setSunk = (val) => {
        sunk = val;
    }
    const checkIfSunk = (x) => {
                if (x == true){
                   setSunk(true);
                }
                else {
                    setSunk(false);
                };
            }
    return {
        length,
        orientation,
        hit,
        checkIfSunk,
        getSunk,
        coordinates
    }
};

export default ShipFactory