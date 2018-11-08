import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import Home from './Home';
import Companies from './Companies';
import Company from './Company';
import Jobs from './Jobs';
import Profile from './Profile';
import Login from './Login';
import { Container } from 'reactstrap';

class Routes extends Component {
  render() {
    return (
      <Container className="Routes justify-content-center">
        <Switch>
          <Route exact path="/"
            render={() => <Home />} />
          <Route exact path="/companies"
            render={() => <Companies />} />
          <Route exact path="/companies/:handle"
            render={props => <Company {...props} />} />
          <Route exact path="/jobs"
            render={() => <Jobs />} />
          <Route exact path="/profile"
            render={() => <Profile currentUser={this.props.currentUser}/>} />
          <Route exact path="/login"
            render={() => <Login />} />
        </Switch>
      </Container>
    );
  }
}

export default Routes;