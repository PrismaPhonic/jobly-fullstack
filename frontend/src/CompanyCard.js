import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './CompanyCard.css'

class CompanyCard extends Component {
  render() {
    let { name, description, logo_url } = this.props.company;
    return (
      <div className="CompanyCard">
        <h3>{name}</h3>
        <p>{description}</p>
        <img src={logo_url} alt="Logo Not Found" ></img>
      </div>
    );
  }
}

export default CompanyCard;