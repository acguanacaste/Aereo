import {createStore, applyMiddleware, compose } from 'redux';
import {routerMiddleware} from 'react-router-redux';
import {syncHistoryWithStore} from 'react-router-redux';

//import thunk from 'redux-thunk'
import createHistory from 'history/createBrowserHistory';
import rootReducer from './reducers/index';

export const history = createHistory()
const as = [{"idfoto":"1","foto":"001-Playa-Naranjo-a-Volcan-Orosi-aerea-1988.jpg","titulo":"Playa Naranjo a Volc\u00e1n Oros\u00ed a\u00e9rea","sector":"(Izquierda) Volc\u00e1n Cacao (derecha) Cerro el Hacha (Izquierda)Argelia Centro Abajo","latitud":"10.7715072632","longitud":"-85.6607894897","ano":"1988"},{"idfoto":"2","foto":"002-Carbonal-1988.jpg","titulo":"Carbonal","sector":"(parte mas sur del sector Santa Rosa)","latitud":"10.7591123581","longitud":"-85.6585159302","ano":"1988"},{"idfoto":"3","foto":"003-Camino-a-playa-naranjo-1988.jpg","titulo":"Camino a playa Naranjo","sector":"Sector Oeste, Sector Santa Rosa","latitud":"10.8067502975","longitud":"-85.6481475830","ano":"1988"},];
// console.log(as);

const initialState = {
    photos: as,
    activePhoto: as[0],
    year:null,
    geoSearch:null,
    dataSets:null
}

const middleware = [
//    thunk,
    routerMiddleware(history)
]

//export NODE_ENV=development in local machine
if (process.env.NODE_ENV === 'development') {
    const devToolsExtension = window.devToolsExtension

    if (typeof devToolsExtension === 'function') {
        enhancers.push(devToolsExtension())
    }
}

const composedEnhancers = compose (
    applyMiddleware(...middleware),
    ...enhancers
)

const store = createStore(
    rootReducer,
    initialState,
    composedEnhancers
)

//hot reload for
if (module.hot){
    module.hot.accept('./reducers/', () =>{
        const nextRootReducer = require('./reducers/index').default;
        store.replaceReducer(nextRootReducer);
    })
}
export default store