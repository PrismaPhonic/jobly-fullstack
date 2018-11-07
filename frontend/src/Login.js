import React, { Component } from 'react';
// import { Link } from 'react-router-dom';

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

  handleClick(show) {
    this.setState({
      showSignup: show
    })
  }

  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  render() {
    return (
      <div className="Login">
        <br></br>
        <button onClick={(evt) => this.handleClick(false)}>Login</button>
        <button onClick={(evt) => this.handleClick(true)}>Signup</button>
        <form className="LoginSignupForm">
          <br />
          <label htmlFor="username">Username</label>
          <input id="username" name="username"
            value={this.state.username}
            onChange={this.handleChange}
            type='text' />
          <br />

          <label htmlFor="password">Password</label>
          <input id="password" name="password"
            value={this.state.password}
            type='password'
            onChange={this.handleChange} />
          <br />
          {this.state.showSignup ?
            <React.Fragment>
              <label htmlFor="first_name">First Name</label>
              <input id="first_name" name="first_name"
                value={this.state.first_name}
                onChange={this.handleChange}
                type='text'></input>
              <br></br>
              <label htmlFor="last_name">Last Name</label>
              <input id="last_name" name="last_name"
                value={this.state.last_name}
                type='text'
                onChange={this.handleChange} />
              <br></br>
              <label htmlFor="email">Email</label>
              <input id="email" name="email"
                value={this.state.email}
                type='email'
                onChange={this.handleChange} />
              <br></br>
            </React.Fragment> :
            ''
          }
          <button>Submit</button>
        </form>
      </div>
    );
  }
}

export default Login;