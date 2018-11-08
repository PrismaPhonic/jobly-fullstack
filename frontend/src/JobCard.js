import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './JobCard.css';

class JobCard extends Component {
  // Displays a card about a job and a button to apply for it
  render() {
    let { title, salary, equity } = this.props.job;
    return (
      <div className="JobCard">
        <h3>{title}</h3>
        <p>Salary: {salary}</p>
        <p>Equity: {equity}</p>
        <button>Apply</button>
      </div>
    );
  }
}

export default JobCard;