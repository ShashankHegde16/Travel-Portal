
const initialState = {
    showModal: false,
    message: '',
};
export const modalReducer = (state = initialState, action) => {
    console.log(action, 'here')
    switch (action.type) {
        case 'OPEN_LOADER':
            return {
                ...state,
                showModal: true,
                message: action.message,
            };
        case 'CLOSE_LOADER':
            return {
                ...state,
                showModal: false,
                message: '',
            };
        default:
            return {
                ...state,
            };
    }
};

