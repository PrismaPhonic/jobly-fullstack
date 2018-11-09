import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';

import './Company.css'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      applications: [],
      loading: true,
      error: false
    }
  }

  // Takes the handle from url params and gets company details
  async componentDidMount() {
    try {
      let company = await JoblyApi.getCompany(this.props.match.params.handle);
      if (!company) throw new Error();
      const applicationObjs = await JoblyApi.getApplications(this.props.currentUser);
      const applications = applicationObjs.map(appObj => appObj.job_id);
      console.log('applications: ', applications);
      this.setState({ company, applications, loading: false });
    } catch (err) {
      this.setState({ error: true })
    }
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

  // Displays a list of jobs for this company and
  // details up top
  render() {
    if (this.state.error) return <h1>Company could not be found</h1>
    if (this.state.loading) return <h1>Loading...</h1>
    return (
      <div className="Company">
        <h1>{this.state.company.name}</h1>
        <p>{this.state.company.description}</p>
        {this.state.company.jobs.map(job => {
          return (
            <JobCard
              apply={this.applyForJob}
              key={job.id} job={job}
              applied={(this.state.applications.includes(job.id))} />
          );
        })}
      </div>
    )
  }
}

export default Company;