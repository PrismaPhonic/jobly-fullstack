import React, { Component } from 'react';
import './JobCard.css';
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
        <Button 
          color="primary" 
          onClick={() => this.props.apply(this.props.job)} 
          disabled={this.props.applied}>
          {this.props.applied ? "Applied" : "Apply"}</Button>
      </Card>
    );
  }
}

export default JobCard;