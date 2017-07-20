function geoSearch (state=[],action) {
    switch (action.type){
        case 'SET_GEO_SEARCH':
            console.log('set geo reducer');

            return[
                ...state,
                action.geoSearch
            ];
        default:
            return state;
    }
}

export default geoSearch;