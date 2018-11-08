import React, { Component } from 'react';
import { Redirect } from 'react-router-dom'
import { Alert, Button, Form, Input } from 'reactstrap';
import JoblyApi from './JoblyApi';
import './Profile.css';

class Profile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...this.props.currentUser,
      password: '',
      userUpdated: false,
      errors: []
    }
  }

  handleSubmit = async (evt) => {
    evt.preventDefault();
    const resp = await JoblyApi.updateUser(this.state);
    if (resp.errors) {
      this.setState({
        errors: resp.errors
      })
    }
  }

  // Control input fields
  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    if (this.props.currentUser === null) return <Redirect to='/login' />
    return (
      <Form onSubmit={this.handleSubmit} className="Profile mt-5 p-3">
        <label htmlFor="username">Username</label>
        <Input id="username"
          name="username"
          value={this.state.username}
          onChange={this.handleChange}
          type='text'
          disabled />

        <label htmlFor="first_name">First Name</label>
        <Input id="first_name"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handleChange}
          type='text' />

        <label htmlFor="last_name">Last Name</label>
        <Input id="last_name"
          name="last_name"
          value={this.state.last_name}
          type='text'
          onChange={this.handleChange} />

        <label htmlFor="email">Email</label>
        <Input id="email"
          name="email"
          value={this.state.email}
          type='email'
          onChange={this.handleChange} />

        <label htmlFor="password">Enter Password</label>
        <Input id="password"
          name="password"
          value={this.state.password}
          type='password'
          onChange={this.handleChange} />

        <br />
        {this.state.errors.map(error => <Alert key={error} color="warning">{error}</Alert>)}
        <Button color="primary">Save</Button>
      </Form>
    );
  }
}

export default Profile;