function years (state=[],action) {
    switch (action.type){
        case 'SET_YEARS':
            console.log('years reducer');
            //posiblemente venga actions.newPhotos algo así
            return {
                ...state,
                year: action.years
            };
        default:
            return state;
    }
}

export default years;