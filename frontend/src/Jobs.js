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

  appliedTo(id) {
    for (let app of this.props.applications) {
      if (id === app.id) return true;
    }    
    return false;
  }

  render() {
    if (this.props.currentUser === null) return <Redirect to='/login' />
    if (this.state.error) return <h1>{this.state.error}</h1>
    if (this.state.loading) return (
      <div><Search handleSearch={this.searchJobs} />
        <h3>Loading...</h3></div>
    );
    console.log()
    return (
      <div className="Jobs">
      {/* <pre>{JSON.stringify(this.props,null,4)}</pre> */}
        <Search handleSearch={this.searchJobs} />
        {this.state.jobs.map(job => {
          return (
            <JobCard
              apply={this.props.apply}
              key={job.id} job={job}
              applied={(this.appliedTo(job.id))} />
          );
        })}
      </div>
    );
  }
}

export default Jobs;