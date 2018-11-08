import React, { Component } from 'react';
import JoblyNavbar from './JoblyNavbar';
import Routes from './Routes';
import './App.css';
import jwt from 'jsonwebtoken'
import JoblyApi from './JoblyApi';

const testuser = {
  username: "testuser",
  first_name: "Tom",
  last_name: "Jobly",
  email: "tomjobly@jobly.com"
}

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
      currentUser: null
    }
  }

  async componentDidMount() {
    const token = localStorage.getItem('token');
    if (token) {
      await this.setCurrentUser(token);
    }
  }

  /** 
   * login is passed down to Login component to request
   * a token from the server upon Log In
   */
  authenticate = async (data) => {
    const resp = await JoblyApi.authUser(data);
    if (resp.errors) {
      console.log('errors', resp.errors);
      return resp;
    }
    await this.setCurrentUser(resp.token);
  }

  /**
   * register is passed down to Login component to request
   * a token from the server upon Sign Up 
   */
  register = async (data) => {
    const resp = await JoblyApi.createUser(data)
    if (resp.errors) {
      console.log('errors', resp.errors);
      return resp;
    }
    await this.setCurrentUser(resp.token)
  }

  /**
   * Logs out user by clearing local storage and setting state back to null
   */
  logout() {
    localStorage.clear();
    this.setState({ currentUser: null });
  }

  /**
   * setCurrentUser is a helper function to get user details
   */
  async setCurrentUser(token) {
    const payload = jwt.decode(token);
    const { username } = payload;
    const currentUser = await JoblyApi.getUser(username, token);
    localStorage.setItem('token', token);
    this.setState({ currentUser });
  }

  render() {
    return (
      <div className="App">
        <JoblyNavbar logout={this.logout} currentUser={this.state.currentUser} />
        <Routes
          currentUser={this.state.currentUser}
          authenticate={this.authenticate}
          register={this.register} />
      </div>
    );
  }
}

export default App;
