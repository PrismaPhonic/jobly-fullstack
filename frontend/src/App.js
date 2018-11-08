import React, { Component } from 'react';
import Navbar from './Navbar';
import Routes from './Routes';
import { Container } from 'reactstrap';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Navbar />
        <Container className="Content">
          <Routes />
        </Container>
      </div>
    );
  }
}

export default App;
