import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './JobCard.css';
import { Button, Card, CardTitle, CardBody } from 'reactstrap';

class JobCard extends Component {
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
        <Button color="primary">Apply</Button>
      </Card>
    );
  }
}

export default JobCard;