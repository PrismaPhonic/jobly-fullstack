import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './JobCard.css';
import JoblyApi from './JoblyApi';
import { Alert, Button, Card, CardTitle, CardBody } from 'reactstrap';

class JobCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    }
  }

  // Displays a card about a job and a button to apply for it
  render() {
    let { title, salary, equity } = this.props.job;
    return (
      <Card className="JobCard">
        <CardTitle>{title}</CardTitle>
        <CardBody>
          <p>Salary: {salary}</p>
          <p>Equity: {equity}</p>
        </CardBody>
        {this.state.error ?
          <Alert>{this.state.error}</Alert> :
          ''}
        <Button color="primary" onClick={this.apply} disabled={this.props.applied}>Apply</Button>
      </Card>
    );
  }
}

export default JobCard;