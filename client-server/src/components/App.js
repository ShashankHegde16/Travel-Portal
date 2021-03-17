import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './products/Main';
import history from '../history';
import Geo from './Geo/Geo';

const App = () => {

    return (
        <div>
            <Router history={history}>
                <Header />
                <Switch>
                    <div>
                        <Route path='/' exact component={Main}></Route>
                        <Route path='/geo' exact component={Geo}></Route>
                    </div>
                </Switch>

            </Router>
        </div>
    )
}

export default App;