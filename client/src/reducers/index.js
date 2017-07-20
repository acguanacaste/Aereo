import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

import activePhoto from './activePhoto';
import dataSets from './dataSets';
import geoSearch from './geoSearch';
import markers from './markers';
import photos from './photos';
import years from './years';

export default combineReducers({
    activePhoto,
    dataSets,
    geoSearch,
    markers,
    photos,
    years,
    routing: routerReducer
});
