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
      <Container className="Routes justify-content-center pt-3">
        <Switch>
          <Route exact path="/"
            render={() => <Home currentUser={this.props.currentUser} />} />
            
          <Route exact path="/companies"
            render={() => <Companies currentUser={this.props.currentUser} />} />

          <Route exact path="/companies/:handle"
            render={props => {
              return (
                <Company
                  {...props}
                  currentUser={this.props.currentUser}
                  applications={this.props.applications}
                  apply={this.props.apply} />
              )
            }
            } />

          <Route exact path="/jobs"
            render={() => {
              return (
                <Jobs
                  currentUser={this.props.currentUser}
                  applications={this.props.applications}
                  apply={this.props.apply} />
              )
            }
            } />

          <Route exact path="/profile"
            render={() => <Profile currentUser={this.props.currentUser} />} />

          <Route exact path="/login"
            render={() => {
              return (
                <Login
                  currentUser={this.props.currentUser}
                  authenticate={this.props.authenticate}
                  register={this.props.register} />)
            }
            } />
        </Switch>
      </Container>
    );
  }
}

export default Routes;