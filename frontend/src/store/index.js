import {legacy_createStore as createStore, combineReducers, applyMiddleware, compose, legacy_createStore} from 'redux';
import thunk from 'redux-thunk';
import sessionReducer from './session';

const rootReducer = combineReducers({
  session: sessionReducer,
});


let enhancer;

if(process.env.NODE_ENV === 'production'){
    enhancer = applyMiddleware(thunk);
} else {
    const logger = require('redux-logger').default;
    const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE || compose;
    enhancer = composeEnhancers(applyMiddleware(thunk,logger));
}

const configureStore = (preloadedState) => {
    return createStore(rootReducer, preloadedState, enhancer);
}

export default configureStore;