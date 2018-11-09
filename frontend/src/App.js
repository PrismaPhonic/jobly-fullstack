import React, { Component } from 'react';
import JoblyNavbar from './JoblyNavbar';
import Routes from './Routes';
import './App.css';
import jwt from 'jsonwebtoken'
import JoblyApi from './JoblyApi';
import { withRouter } from 'react-router-dom';

//

/**
 * Authorization process:
 * 1) When App mounts, check local storage for token
 *
 * 2) Decode the token to get the username
 * 
 * 3) Request the user details from the backend
 * 
 * 4) Set the current user details onto state
 * 
 * 5) Pass current user down to Routes and Navbar
 */


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentUser: null,
      applications: [],
      loading: true
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      await this.setCurrentUser(token);
    }
    this.setState({ loading: false });
  }

  /** 
   * login is passed down to Login component to request
   * a token from the server upon Log In
   */
  authenticate = async (data) => {
    const resp = await JoblyApi.authUser(data);
    // if we get an error from server, do not call setCurrentUser
    if (resp.errors) return resp;
    await this.setCurrentUser(resp.token);
    return resp;
  }

  /**
   * register is passed down to Login component to request
   * a token from the server upon Sign Up 
   */
  register = async (data) => {
    const resp = await JoblyApi.createUser(data);
    // if we get an error from server, do not call setCurrentUser
    if (resp.errors) return resp;
    await this.setCurrentUser(resp.token);
    return resp;
  }

  /**
   * Logs out user by removing token from local storage,
   * Sets currentUser in state to null,
   * Pushes home page to history
   */
  logout = () => {
    // remove token from storage
    localStorage.removeItem('token');

    this.setState({ currentUser: null }, () => {
      this.props.history.push('/');
    });
  }

  /**
   * setCurrentUser is a helper function to get user details
   */
  async setCurrentUser(token) {
    const { username } = jwt.decode(token);
    const currentUser = await JoblyApi.getUser(username, token);
    localStorage.setItem('token', token);

    // PUT REQUEST FOR APPLICATIONS HERE?
    // seems related and then we only have one set state
    const applicationObjs = await JoblyApi.getApplications(currentUser);
    const applications = applicationObjs.map(appObj => appObj.job_id);

    this.setState({ currentUser, applications });
  }

  /** 
  * click handler passed as prop to JobCard button to apply for a job 
  * sets a list of job ids to an array of applications on state
  */
  applyForJob = async (id) => {
    try {
      let resp = await JoblyApi.applyForJob(id);
      if (!resp.message) throw new Error('could not apply for that job')
      // here we set state because no error 
      this.setState({
        applications: [...this.state.applications, id]
      })
    } catch (err) {
      this.setState({
        error: err
      })
    }
  }

  render() {
    // let's make sure we don't render routes until we have checked if 
    // the user is already logged in
    return (
      <div className="App">
        {/* <pre>{JSON.stringify(this.props,null,4)}</pre> */}
        <JoblyNavbar logout={this.logout} currentUser={this.state.currentUser} />
        {!this.state.loading ?
          <Routes
            currentUser={this.state.currentUser}
            authenticate={this.authenticate}
            register={this.register}
            applications={this.state.applications}
            apply={this.applyForJob}
          /> : ''
        }

      </div>
    );
  }
}

export default withRouter(App);
