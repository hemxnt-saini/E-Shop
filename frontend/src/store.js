import {createStore, combineReducers, applyMiddleware} from 'redux';
import thunk from 'redux-thunk'
import {composeWithDevTools} from 'redux-devtools-extension'
import productListReducer from './reducers/productReducers'

//CombineReducers
const reducer = combineReducers({
    productList: productListReducer
})

//Initial State
const initialState ={}

//Middlewares
const middleware = [thunk]

//STORE
const store  = createStore(reducer,initialState,composeWithDevTools(applyMiddleware(...middleware)))

export default store