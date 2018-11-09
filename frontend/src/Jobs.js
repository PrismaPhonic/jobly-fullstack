import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import Search from './Search';
import './Jobs.css'

class Jobs extends Component {

  constructor(props) {
    super(props);
    this.state = {
      jobs: [],
      loading: true,
      error: null
    };
  }

  /** get all jobs on mount */
  async componentDidMount() {
    const jobs = await JoblyApi.getJobs();
    this.setState({ jobs, loading: false });
  }

  /** get list of filtered jobs and update state */
  searchJobs = async (search) => {
    const jobs = await JoblyApi.getJobs(search);
    this.setState({ jobs });
  }

  render() {
    if (this.props.currentUser === null) return <Redirect to='/login' />
    if (this.state.error) return <h1>{this.state.error}</h1>
    if (this.state.loading) return (
      <div><Search handleSearch={this.searchJobs} />
        <h3>Loading...</h3></div>
    );
    return (
      <div className="Jobs">
        <Search handleSearch={this.searchJobs} />
        {this.state.jobs.map(job => {
          return (
            <JobCard
              apply={this.props.apply}
              key={job.id} job={job}
              applied={(this.props.applications.includes(job.id))} />
          );
        })}
      </div>
    );
  }
}

export default Jobs;