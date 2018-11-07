import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import './Jobs.css'

class Jobs extends Component {

  constructor(props) {
    super(props);
    this.state = {jobs: []};
  }

  async componentDidMount() {
    /** make get request to /jobs */
    let jobs = await JoblyApi.getJobs();;
    this.setState({jobs});
  }

  render() {
    return (
      <div className="Jobs">
        <h1>This is a list of all the Jobs</h1>
        {this.state.jobs.map(job => <JobCard key={job.id} job={job} /> )}
      </div>
    );
  }
}

export default Jobs;