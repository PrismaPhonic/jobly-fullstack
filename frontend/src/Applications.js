import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';
import JoblyApi from './JoblyApi';
import ApplicationCard from './ApplicationCard';
import Search from './Search';
import './Companies.css';

class Companies extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: true,
      error: null
    };
  }

  /** make get request to /companies */
  // async componentDidMount() {
  //   try {
  //     let companies = await JoblyApi.getCompanies();
  //     if (companies.length === 0) throw new Error('Server has died horribly. :(')
  //     this.setState({ companies, loading: false });
  //   } catch (err) {
  //     this.setState({ error: err.message })
  //   }
  // }

  // // get companies filtered by search value
  // searchCompanies = async (search) => {
  //   try {
  //     let companies = await JoblyApi.getCompanies(search);
  //     if (companies.length === 0) throw new Error('Your search did not return any companies')
  //     this.setState({ companies, loading: false, error: false });
  //   } catch (err) {
  //     this.setState({ error: err.message })
  //   }
  // }

  render() {
    if (this.props.currentUser === null) return <Redirect to='/login' />
    // if (this.state.error) return (
    //   <div><Search handleSearch={this.searchCompanies} />
    //   <h1>{this.state.error}</h1></div>
    // );
    // if (this.state.loading) return (
    //   <div><Search handleSearch={this.searchCompanies} />
    //     <h3>Loading...</h3></div>
    // );
    return (
      <div className="Applications">
      {/* <pre>{JSON.stringify(this.props,null,4)}</pre> */}
        {this.props.applications.map(app => <ApplicationCard key={app.id} application={app} />)}
      </div>
    );
  }
}

export default Companies;