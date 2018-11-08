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
  }

  // control input
  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  // prevent default and call search function passed from 
  // parent with search param
  handleClick(evt) {
    evt.preventDefault();
    this.props.search(this.state.search);
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
      <Form inline className="Search my-4 row justify-content-center">
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
