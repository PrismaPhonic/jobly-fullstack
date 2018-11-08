import React, { Component } from 'react';
import { Navbar, NavbarBrand, Nav, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import './JoblyNavbar.css';

class JoblyNavbar extends Component {
  render() {
    /** NavLink for '/' is given 'exact' to correctly toggle .active */
    return (
      <Navbar color="light" light className="JoblyNavbar">
        <NavLink exact className="navbar-brand" to='/'>Jobly</NavLink>
        <Nav className="ml-auto">
          <NavItem>
            <NavLink className="nav-link" to='/companies'>Companies</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to='/jobs'>Jobs</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to='/profile'>Profile</NavLink>
          </NavItem>
          <NavItem>
            <NavLink className="nav-link" to='/login'>Log In</NavLink>
          </NavItem>
        </Nav>
      </Navbar>
    );
  }
}

export default JoblyNavbar;
