import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import CompanyCard from './CompanyCard';
import Search from './Search';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      companies: [],
      loading: true,
      error: null
    };
  }

  /** make get request to /companies */
  async componentDidMount() {
    try {
      let companies = await JoblyApi.getCompanies();
      if (companies.length === 0) throw new Error('Server has died horribly. :(')
      this.setState({ companies, loading: false });
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  // get companies filtered by search value
  searchCompanies = async (search) => {
    try {
      let companies = await JoblyApi.getCompanies(search);
      if (companies.length === 0) throw new Error('Your search did not return any companies')
      this.setState({ companies, loading: false });
    } catch (err) {
      this.setState({ error: err.message })
    }
  }

  render() {
    if (this.state.error) return <h1>{this.state.error}</h1>
    if (this.state.loading) return <h1>Loading...</h1>
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