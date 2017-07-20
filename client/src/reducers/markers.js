function markers (state=[],action) {
    switch (action.type){
        case 'SET_MARKERS':
            console.log('set photos reducer');
            const markers = generateMarkers(action.photos);
            return[
                ...state,
                markers
            ];
        default:
            return state;
    }
}

function generateMarkers (photos){
    return photos;

}
export default markers;