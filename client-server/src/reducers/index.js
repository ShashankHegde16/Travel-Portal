import { combineReducers } from 'redux';
import { transactions } from './transaction';
import { products } from './products';
import { coordinates } from './coordinates'

export default combineReducers({
    transactions: transactions,
    products,
    coordinates
});

