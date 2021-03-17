export const coordinates = (state = [], action) => {
    switch (action.type) {
        case 'LAT_LNG':
            return action.payload;
        default:
            return state;

    }
}