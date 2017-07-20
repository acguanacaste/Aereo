function activePhoto (state=[],action) {
    switch (action.type){
        case 'SET_ACTIVE_PHOTO':
            console.log('set active photo reducer');
            return{
                ...state,
                activePhoto:action.activePhoto
            };
        default:
            return state;
    }
}

export default activePhoto;