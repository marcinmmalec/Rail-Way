import React from 'react';
import {Header} from './components/Header';
import {NavBar} from './components/NavBar';
import {RoutesList} from './views/RoutesList';
import {Travel} from './views/Travel';
import {Favourites} from './views/Favourites';
import { Route, Switch, Redirect } from 'react-router-dom';

export const Routes = () => {
  return (
    <div className="ui segment">
        <Header />
        <Switch>
            <Route exact path="/" component={RoutesList} />
            <Route exact path="/">
                <Redirect to="/" />
            </Route>
            <Route exact path="/travel" component={Travel} />
            <Route exact path="/favourites" component={Favourites} />
        </Switch>
        <NavBar />
    </div>
  );
};
