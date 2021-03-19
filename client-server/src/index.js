import 'semantic-ui-css/semantic.min.css'
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose } from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from './reducers';
import App from './components/App';
import interceptor from './utils/interceptor';
import './style.css';


const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers, composeEnhancers(applyMiddleware(reduxThunk)));
interceptor(store);

const MainApp = () => {
    return (
        <Provider store={store}>
            <App />
        </Provider>
    );
}

ReactDOM.render(<MainApp />, document.querySelector('#root'));
