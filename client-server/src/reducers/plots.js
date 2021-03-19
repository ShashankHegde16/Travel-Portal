import axios from 'axios';
import _ from 'lodash';
const PLOT_KEYS = ['price', 'total_booking_count']
export const plots = (state = {}, action) => {
    switch (action.type) {
        case 'GET_PLOTS': {
            return { ...state, ...action.payload };
        }
        case 'DELETE_PLOTS': {
            if (action.payload.length == 0) {
                return _.omit(state, PLOT_KEYS);
            }
            Object.keys(state).forEach((key) => {
                if (action.payload && action.payload.indexOf(key) == -1) {
                    state = _.omit(state, key);
                }
            });
            return state;
        }
        default:
            return state;

    }
}