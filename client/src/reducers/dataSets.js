function dataSets (state=[],action) {
    switch (action.type){
        case 'SET_DATASETS':
            console.log('dataSets reducer');
            return{
                ...state,
                dataSets:action.dataSets
            };
        default:
            return state;
    }
}

export default dataSets;