import React, { Component } from 'react';
import { Alert, Button, Card, CardTitle, CardBody } from 'reactstrap';
import './ApplicationCard.css';

class ApplicationCard extends Component {
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
      {/* <pre>{JSON.stringify(this.props,null,4)}</pre> */}
        <CardTitle>{this.props.application.title}</CardTitle>
        <CardBody>
          <p>{this.props.application.company}</p>
          <Alert>{this.props.application.state}</Alert>
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

export default ApplicationCard;