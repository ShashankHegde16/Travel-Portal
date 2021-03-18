import axios from 'axios';

const interceptor = (store) => {
    axios.interceptors.request.use(request => {
        store.dispatch({ type: 'OPEN_LOADER', payload: { showModal: true, message: 'loading' } })
        return request;

    }, error => {
        store.dispatch({ type: 'CLOSE_LOADER' });
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        store.dispatch({
            type: 'CLOSE_LOADER'
        });
        return response;
    }, error => {
        store.dispatch({ type: 'CLOSE_LOADER' })
        return Promise.reject(error);
    });
}


export default interceptor;