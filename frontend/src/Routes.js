import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Jobs from './Jobs';
import Profile from './Profile';
import Login from './Login';


class Routes extends Component {
  render() {
    return (
      <div className="Routes">
        <Switch>
          <Route exact path="/"
            render={() => <Home />} />
          <Route exact path="/companies"
            render={() => <Companies />} />
          <Route exact path="/jobs"
            render={() => <Jobs />} />
          <Route exact path="/profile"
            render={() => <Profile />} />
          <Route exact path="/login"
            render={() => <Login />} />
        </Switch>
      </div>
    );
  }
}

export default Routes;