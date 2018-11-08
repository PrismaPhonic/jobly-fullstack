import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import Search from './Search';
import './Jobs.css'

class Jobs extends Component {

  constructor(props) {
    super(props);
    this.state = { jobs: [] };
  }

  /** get all jobs on mount */
  async componentDidMount() {
    let jobs = await JoblyApi.getJobs();;
    this.setState({ jobs });
  }

  /** get list of filtered jobs and update state */
  searchJobs = async (search) => {
    let jobs = await JoblyApi.getJobs(search);
    this.setState({ jobs });
  }

  render() {
    return (
      <div className="Jobs">
        <Search search={this.searchJobs} />
        {this.state.jobs.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    );
  }
}

export default Jobs;