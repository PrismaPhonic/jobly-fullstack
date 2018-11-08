import React, { Component } from 'react';
import { Form, Input, Button, ButtonGroup, Alert } from 'reactstrap';
import { Redirect } from 'react-router-dom';
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
      showSignup: false,
      errors: []
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  // Handles login and signup button and flips state
  handleClick(show) {
    this.setState({
      showSignup: show
    })
  }

  // Handle form submission gracefully
  async handleSubmit(evt) {
    evt.preventDefault();
    const { username, password, first_name, last_name, email } = this.state;

    // Are we logging in or signing up?
    let resp;
    if (this.state.showSignup) {
      resp = await this.props.register({ username, password, first_name, last_name, email });
    } else {
      resp = await this.props.authenticate({ username, password });
    }
    // if we got back an array of errors, let's set state to alert user
    if (resp.errors) this.setState({ errors: resp.errors });
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

        <label htmlFor="last_name">Last Name</label>
        <Input id="last_name" name="last_name"
          value={this.state.last_name}
          type='text'
          onChange={this.handleChange} />
          
        <label htmlFor="email">Email</label>
        <Input id="email" name="email"
          value={this.state.email}
          type='email'
          onChange={this.handleChange} />
      </React.Fragment>
    );
  }


  /* 
  * Renders a login form. Buttons are provided
  * to toggle the login and sign up forms 
  */
  render() {
    if (this.props.currentUser) return <Redirect to='/' />
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
          {this.state.errors.map(error => <Alert key={error} color="warning">{error}</Alert>)}
          <Button color="primary">Submit</Button>
        </Form>
      </div>
    );
  }
}

export default Login;