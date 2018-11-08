import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class Home extends Component {
  render() {
    return (
      <div className="Home">
        <h1>Jobly</h1>
        <h5>All the jobs in one, convenient place.</h5>
        { this.props.currentUser ? 
          <h3>Welcome, {this.props.currentUser.first_name}!</h3> : 
          <Link to='/login' className="btn btn-primary">Login</Link> }
      </div>
    );
  }
}

export default Home;