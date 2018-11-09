import React, { Component } from 'react';
import { Button, Form, Input } from 'reactstrap'
import './Search.css';
import _ from 'lodash';



class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      search: ''
    }

    this.handleClick = this.handleClick.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // we have a function called search, and a string called search
    this.props.handleSearch(this.state.search);
  }

  // control input and filter results as letters are typed
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value }, () => {
      /** run a search query only once every 250 milliseconds */
      const handleSearch = this.props.handleSearch(this.state.search);
      _.debounce(() => handleSearch, 250,)();
    }) 
  }

  // prevent default and call search function passed from 
  // parent with search param
  handleClick(evt) {
    evt.preventDefault();
    this.props.handleSearch(this.state.search);
  }

  render() {
    return (
      <Form onSubmit={this.handleSubmit} inline className="Search my-4 row justify-content-center">
        <Input
          type="text"
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleChange}
          className="form-control"
        />

        <Button color="primary">Search</Button>
      </Form>
    );
  }
}

export default Search;
