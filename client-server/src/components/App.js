import React from 'react';
import { Router, Route, Switch } from 'react-router-dom';
import Header from './Header';
import Main from './products/Main';
import history from '../history';
import Geo from './Geo/Geo';
import Loader from './Modals/loader';
import Dashboard from './Charts/Dashboard';

const App = () => {

    return (
        <div>
            <Router history={history}>
                <Header />
                <div style={{ marginTop: "7em" }}>
                    <Switch >
                        <React.Fragment>
                            <Route path='/' exact component={Main}></Route>
                            <Route path='/geo' exact component={Geo}></Route>
                            <Route path='/graph' exact component={Dashboard}></Route>
                        </React.Fragment>
                    </Switch>
                </div>

                <Loader />
            </Router>
        </div>
    )
}

export default App;