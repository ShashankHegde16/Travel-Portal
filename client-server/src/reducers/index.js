import { combineReducers } from 'redux';
import { transactions } from './transaction';
import { products } from './products';
import { coordinates } from './coordinates'
import { plots } from './plots';
import { modalReducer } from './model';


export default combineReducers({
    transactions: transactions,
    products,
    coordinates,
    plots,
    modalReducer
});

