import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Button, Form, FormControl, Input } from 'reactstrap'
import './Search.css';

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

  // control input
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
    this.props.handleSearch(this.state.search);
  }

  // prevent default and call search function passed from 
  // parent with search param
  handleClick(evt) {
    evt.preventDefault();
    this.props.handleSearch(this.state.search);
  }

  render() {
    // return (
    //   <form className="Search">
    //     <input
    //       type="text"
    //       placeholder="Enter search term..."
    //       id="search"
    //       name="search"
    //       value={this.state.search}
    //       onChange={this.handleChange} />
    //     <button onClick={this.handleClick}>
    //       Submit
    //     </button>
    //   </form>

    // );
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
