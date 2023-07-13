import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Auth from '../pages/Auth';
import Home from '../pages/Home';
import Cut from '../pages/Cut';
import ListCut from '../pages/ListCut'
import Register from '../pages/Register'
import Sheduling from '../pages/Sheduling'

const Routes: React.FC = () => (
  <Switch>
    <Route path="/auth" exact component={Auth} />
    <Route path="/home" exact component={Home} />
    <Route path="/" exact component={Cut} />
    <Route path="/list" exact component={ListCut} />
    <Route path="/register" exact component={Register} />
    <Route path="/scheduling" exact component={Sheduling} />
  </Switch>
);

export default Routes;
