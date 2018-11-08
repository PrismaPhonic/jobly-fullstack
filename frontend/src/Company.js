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
      loading: true,
      error: false
    }
  }

  // Takes the handle from url params and gets company details
  async componentDidMount() {
    try {
      let company = await JoblyApi.getCompany(this.props.match.params.handle);
      if (!company) throw new Error();
      this.setState({ company, loading: false });
    } catch (err) {
      this.setState({ error: true })
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
        {this.state.company.jobs.map(job => <JobCard key={job.id} job={job} />)}
      </div>
    )
  }
}

export default Company;