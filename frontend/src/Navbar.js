import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class App extends Component {
  render() {
    /** NavLink for '/' is given 'exact' to correctly toggle .active */
    return (
      <nav className="Navbar">
        <NavLink exact className="Navlink" to='/'>Jobly</NavLink>
        <NavLink className="Navlink" to='/companies'>Companies</NavLink>
        <NavLink className="Navlink" to='/jobs'>Jobs</NavLink>
        <NavLink className="Navlink" to='/profile'>Profile</NavLink>
        <NavLink className="Navlink" to='/login'>Log In</NavLink>
      </nav>
    );
  }
}

export default App;
