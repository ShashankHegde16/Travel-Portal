import axios from 'axios';
export const getTransactions = (page, limit, sortBy, direction, searchTerm) => async (dispatch) => {
    const response = await axios.get('/api/list', {
        params: { page, limit, sortBy, direction, searchTerm }
    });
    dispatch({ type: 'FETCH_TRANS', payload: response.data })
}

export const getProducts = () => async dispatch => {
    const response = await axios.get('/api/products');
    dispatch({ type: 'PRODUCTS_LIST', payload: response.data });
}

export const getCoordinates = () => async dispatch => {
    const response = await axios.get('/api/coordinates');
    dispatch({ type: 'LAT_LNG', payload: response.data });

}

export const getAggregatedAmt = (key, type) => async dispatch => {
    const response = await axios.get('/api/aggregate', {
        params: { key, type }
    });
    dispatch({ type: 'LAT_LNG', payload: response.data });
}

export const getMinMaxLatLng = () => async dispatch => {
    const response = await axios.get('/api/latlng');
    dispatch({ type: 'MAX_LT_LNG', payload: response.data });
}

export const getChartData = (key) => async dispatch => {
    const response = await axios.get('/api/plot', {
        params: { key }
    });
    dispatch({ type: 'GET_PLOTS', payload: response.data });
}

