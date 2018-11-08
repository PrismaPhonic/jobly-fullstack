import React, { Component } from 'react';
import JoblyNavbar from './JoblyNavbar';
import Routes from './Routes';
import './App.css';

const testuser = {
  username: "testuser",
  first_name: "Tom",
  last_name: "Jobly",
  email: "tomjobly@jobly.com"
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <JoblyNavbar currentUser={testuser} />
        <Routes currentUser={testuser} />
      </div>
    );
  }
}

export default App;
