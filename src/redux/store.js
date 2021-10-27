import {applyMiddleware, combineReducers, createStore} from "redux";
import {composeWithDevTools} from "redux-devtools-extension";
import rootReducer from "./rootReducer";
import {getProductDetailsReducer, getProductsReducer} from './Shopping/productReducer'
import thunk from 'redux-thunk'
import shopReducer from "./Shopping/shopping-reducer";

const reducer = combineReducers({
    // cart: rootReducer,
    cart: shopReducer,
    getProducts: getProductsReducer,
    getProductDetails: getProductDetailsReducer,
})

const middleware = [thunk]

const store = createStore(
    // rootReducer,
    // composeWithDevTools()
    reducer,
    composeWithDevTools(applyMiddleware(...middleware)),
);

export default store;
