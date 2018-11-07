import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
import Search from './Search';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = { companies: [] };
    // this.searchCompanies = this.searchCompanies.bind(this);
  }

  async componentDidMount() {
    /** make get request to /companies */
    let companies = await JoblyApi.getCompanies();

    this.setState({ companies });
  }

  searchCompanies = async (search) => {
    let companies = await JoblyApi.getCompanies(search);
    this.setState({ companies });
  }

  render() {
    return (
      <div className="Companies">
        <Search search={this.searchCompanies} />
        <h1>This is a list of all the companies</h1>
        {this.state.companies.map(company => <CompanyCard key={company.handle} company={company} />)}
      </div>
    );
  }
}

export default Companies;