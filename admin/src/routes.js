import React from 'react';
import Header from './components/Header';
import {AdminRoutes} from './views/AdminRoutes';
import {AdminExceptions} from './views/AdminExceptions';
import {AdminStations} from './views/AdminStations';
import {AdminNotifications} from './views/AdminNotifications';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div>
        <Header />
        <Switch>
            <Route exact path="/routes" component={AdminRoutes} />
            <Route exact path="/">
                <Redirect to="/routes" />
            </Route>
            <Route exact path="/exceptions" component={AdminExceptions} />
            <Route exact path="/stations" component={AdminStations} />
            <Route exact path="/notifications" component={AdminNotifications} />
        </Switch>
        {/*<NavBar />*/}
    </div>
  );
};