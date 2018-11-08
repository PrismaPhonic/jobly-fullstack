import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import JobCard from './JobCard';
import './Company.css'

class Company extends Component {
  constructor(props) {
    super(props);
    this.state = {
      company: {},
      loading: true
    }
  }

  // Takes the handle from url params and gets company details
  async componentDidMount() {
    let company = await JoblyApi.getCompany(this.props.match.params.handle);
    this.setState({ company, loading: false });
  }
  // Displays a list of jobs for this company and
  // details up top
  render() {
    if (this.state.loading) {
      return <h1>Loading...</h1>
    } else {
      return (
        <div className="Company">
          <h1>{this.state.company.name}</h1>
          <p>{this.state.company.description}</p>
          {this.state.company.jobs.map(job => <JobCard key={job.id} job={job} />)}
        </div>
      )
    }
  }
}

export default Company;