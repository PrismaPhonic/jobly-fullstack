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

  handleClick = async (evt) => {
    try {
      const id = this.props.job.id;
      let resp = await JoblyApi.applyForJob(id);
      if (!resp.message) throw new Error('could not apply for that job')
    } catch (err) {
      this.setState({
        error: err
      })
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
        <Button color="primary">Apply</Button>
      </Card>
    );
  }
}

export default JobCard;