import React, { Component } from 'react';
import { Link } from 'react-router-dom';
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


  handleChange(evt) {
    this.setState({ [evt.target.name]: evt.target.value })
  }

  handleClick(evt) {
    evt.preventDefault();
    this.props.search(this.state.search);
  }

  render() {
    return (
      <form className="Search">
        <input
          type="text"
          placeholder="Enter search term..."
          id="search"
          name="search"
          value={this.state.search}
          onChange={this.handleChange} />
        <button onClick={this.handleClick}>
          Submit
        </button>
      </form>
    );
  }
}

export default Search;
