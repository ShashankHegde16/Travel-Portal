import _ from 'lodash';
export const plots = (state = [], action) => {
    switch (action.type) {
        case 'GET_PLOTS':
            {
                const key = action.payload['plot'];
                const data = _.map(action.payload[key], 'amount');
                const series = { name: key, data };
                return [...state, series];
            }
        default:
            return state;

    }
}