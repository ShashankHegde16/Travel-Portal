
const initialState = {
    open: false,
    message: '',
};
export const modalReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'OPEN_MODAL':
            return { open: true, dimmer: true }
        case 'CLOSE_MODAL':
            return { open: false }
        default:
            return {
                ...state,
            };
    }
};

