import axios from 'axios';

const interceptor = (store) => {
    axios.interceptors.request.use(request => {
        store.dispatch({ type: 'OPEN_MODAL', payload: { open: true, dimmer: true } })
        return request;

    }, error => {
        store.dispatch({ type: 'CLOSE_MODAL' });
        return Promise.reject(error);
    });

    axios.interceptors.response.use(response => {
        store.dispatch({
            type: 'CLOSE_MODAL'
        });
        return response;
    }, error => {
        store.dispatch({ type: 'CLOSE_MODAL' })
        return Promise.reject(error);
    });
}


export default interceptor;