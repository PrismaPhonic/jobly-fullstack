import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import { Alert, Button, Card, CardTitle, CardBody } from 'reactstrap';
import './ApplicationCard.css';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  // Displays a card about a job and a button to apply for it
  render() {
    // let { title, salary, equity } = this.props.job;
    return (
      <Card className="ApplicationCard">
      <pre>{JSON.stringify(this.props,null,4)}</pre>
        <CardTitle>title</CardTitle>
        <CardBody>
          <p>body</p>
        </CardBody>
        {this.state.error ?
          <Alert>{this.state.error}</Alert> :
          ''}
        <Button 
          color="danger" 
          >Delete Application</Button>
      </Card>
    );
  }
}

export default JobCard;