import React, { Component } from 'react';
import './Search.css';

class Search extends Component {

  handleClick(evt) {

  }

  render() {
    return (
      <form className="Search">
        <input
          type="text"
          placeholder="Enter search term..."
          id="search"
          name="search" />
        <button onClick={this.handleClick}>
          Submit
        </button>
      </form>
    );
  }
}

export default Search;
