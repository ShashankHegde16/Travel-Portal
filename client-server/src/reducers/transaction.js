
const INIT_STATE = {
    totalRecords: 0,
    list: []
}
export const transactions = (state = INIT_STATE, action) => {

    switch (action.type) {
        case 'FETCH_TRANS':
            return {
                ...state,
                totalRecords: action.payload.records,
                list: action.payload.data
            };
        default:
            return state;
    }
}