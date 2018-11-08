import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

class JoblyNavbar extends Component {
  render() {
    /** NavLink for '/' is given 'exact' to correctly toggle .active */
    return (
      <nav className="JoblyNavbar">
        <NavLink exact className="Navlink" to='/'>Jobly</NavLink>
        <NavLink className="Navlink" to='/companies'>Companies</NavLink>
        <NavLink className="Navlink" to='/jobs'>Jobs</NavLink>
        <NavLink className="Navlink" to='/profile'>Profile</NavLink>
        {this.props.currentUser ? 
          <NavLink className="Navlink" to='/logout'>Log Out</NavLink> :   
          <NavLink className="Navlink" to='/login'>Log In</NavLink>
        }
        
      </nav>
    );
  }
}

export default JoblyNavbar;
