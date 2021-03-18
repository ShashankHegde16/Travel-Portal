export const products = (state = [], action) => {
    switch (action.type) {
        case 'PRODUCTS_LIST':
            return action.payload;
        default:
            return state;
    }
}