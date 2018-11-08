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
    console.log('Token found, setting current user',token);
    await this.setCurrentUser(token);
  }

  /** 
   * login is passed down to Login component to request
   * a token from the server upon Log In
   */
  authenticate = async (data) => {
    const { token } = await JoblyApi.authUser(data);
    await this.setCurrentUser(token);
  }

  /**
   * register is passed down to Login component to request
   * a token from the server upon Sign Up 
   */
  register = async (data) => {
    const {username, password, first_name, last_name, email} = data;
  }

  /**
   * setCurrentUser is a helper function to get user details
   */
  async setCurrentUser(token) {
    const payload = jwt.decode(token);
    const { username } = payload;
    const currentUser = await JoblyApi.getUser(username, token);
    this.setState({ currentUser });
  }

  render() {
    return (
      <div className="App">
        <JoblyNavbar currentUser={this.state.currentUser} />
        <Routes 
          currentUser={this.state.currentUser} 
          authenticate={this.authenticate}
          register={this.register} />
      </div>
    );
  }
}

export default App;
