import React, { Component } from 'react';
import { Form, Input, Button, ButtonGroup } from 'reactstrap';
import './Login.css';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      password: '',
      email: '',
      first_name: '',
      last_name: '',
      showSignup: false
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  // Handles login and signup button and flips state
  handleClick(show) {
    this.setState({
      showSignup: show
    })
  }

  // Handle form submission gracefully
  handleSubmit(evt) {
    evt.preventDefault();
  }

  // Control input fields
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }


  /** helper function returns the fields for the Sign Up form */
  signUpFields() {
    return (
      <React.Fragment>
        <label htmlFor="first_name">First Name</label>
        <Input id="first_name" name="first_name"
          value={this.state.first_name}
          onChange={this.handleChange}
          type='text' />
        <br></br>
        <label htmlFor="last_name">Last Name</label>
        <Input id="last_name" name="last_name"
          value={this.state.last_name}
          type='text'
          onChange={this.handleChange} />
        <br></br>
        <label htmlFor="email">Email</label>
        <Input id="email" name="email"
          value={this.state.email}
          type='email'
          onChange={this.handleChange} />
        <br></br>
      </React.Fragment>
    );
  }


  /* 
  * Renders a login form. Buttons are provided
  * to toggle the login and sign up forms 
  */
  render() {
    return (
      <div className="Login mt-5">
        <ButtonGroup className="d-flex justify-content-end">
          <Button
            className="Button"
            color="info"
            onClick={(evt) => this.handleClick(false)}
            active={!this.state.showSignup ? true : false}>Login</Button>
          <Button
            className="Button btn-primary"
            color="info"
            onClick={(evt) => this.handleClick(true)}
            active={this.state.showSignup ? true : false}>Signup</Button>
        </ButtonGroup>
        <Form onSubmit={this.handleSubmit} className="LoginForm p-3">
          <label htmlFor="username">Username</label>
          <Input id="username" name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type='text' />

          <label htmlFor="password">Password</label>
          <Input id="password" name="password"
            value={this.state.password}
            type='password'
            onChange={this.handleChange} />
          {this.state.showSignup ? this.signUpFields() : ''}
          <br />
          <Button color="primary">Save</Button>
        </Form>
      </div>
    );
  }
}

export default Login;