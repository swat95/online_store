import { applyMiddleware, createStore, compose } from "redux";
import thunk from "redux-thunk";
import rootReducer from './reducers';

let initialState = {};
if (localStorage.getItem('cartItems')) {
    initialState.cart = { items: JSON.parse(localStorage.getItem('cartItems')) }
}
// const composeEnhancer = window._REDUX_DEVTOOLS_EXTENSIONS_COMPOSE_ || compose;
export default createStore(rootReducer, initialState, compose(applyMiddleware(thunk)));