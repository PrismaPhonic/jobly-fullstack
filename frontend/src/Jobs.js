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
      applications: [],
      loading: true,
      error: null
    };
  }

  /** get all jobs on mount */
  async componentDidMount() {
    const jobs = await JoblyApi.getJobs();
    const applicationObjs = await JoblyApi.getApplications(this.props.currentUser);
    const applications = applicationObjs.map(appObj => appObj.job_id);
    this.setState({ jobs, applications, loading: false });
  }

  /** get list of filtered jobs and update state */
  searchJobs = async (search) => {
    const jobs = await JoblyApi.getJobs(search);
    this.setState({ jobs });
  }

  /** 
   * click handler passed as prop to JobCard button to apply for a job 
   * sets a list of job ids to an array of applications on state
   */
  applyForJob = async (id) => {
    try {
      let resp = await JoblyApi.applyForJob(id);
      if (!resp.message) throw new Error('could not apply for that job')
      // here we set state because no error 
      this.setState({
        applications: [...this.state.applications, id]
      })
    } catch (err) {
      this.setState({
        error: err
      })
    }
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
              apply={this.applyForJob}
              key={job.id} job={job}
              applied={(this.state.applications.includes(job.id))} />
          );
        })}
      </div>
    );
  }
}

export default Jobs;