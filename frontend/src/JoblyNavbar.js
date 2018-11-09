import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'reactstrap'
import { NavLink } from 'react-router-dom';
import './JoblyNavbar.css';

class JoblyNavbar extends Component {

  /** prevent link from refreshing and call the logout method */
  handleClick = async (evt) => {
    evt.preventDefault();
    this.props.logout();
  }

  render() {
    /** NavLink for '/' is given 'exact' to correctly toggle .active */
    return (
      <Navbar color="light" light className="JoblyNavbar">
        <NavLink exact className="navbar-brand" to='/'>Jobly</NavLink>
        <Nav className="ml-auto">
          {this.props.currentUser ?
            <React.Fragment>
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
                <a className="nav-link" onClick={this.handleClick} href="/">Log Out</a>
              </NavItem>
            </React.Fragment> :
            <NavItem>
              <NavLink className="nav-link" to='/login'>Log In</NavLink>
            </NavItem>
          }

        </Nav>
      </Navbar>
    );
  }
}

export default JoblyNavbar;
