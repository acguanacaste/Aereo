function photos (state=[],action) {
    switch (action.type){
        case 'SET_PHOTOS':
            console.log('set photos reducer');
            //posiblemente venga actions.newPhotos algo así
            return {
                ...state,
                photos:action.photos
            };
        default:
            return state;
    }
}
export default photos;