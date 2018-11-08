import React, { Component } from 'react';
import Navbar from './Navbar';
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
        <Navbar />
        <Routes currentUser={testuser} />
      </div>
    );
  }
}

export default App;
