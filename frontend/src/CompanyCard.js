import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import './CompanyCard.css'

class CompanyCard extends Component {
  // Displays a card with company details and if you click it
  // brings up company details page
  render() {
    let { name, handle, description, logo_url } = this.props.company;
    return (
      <Link to={`/companies/${handle}`}>
        <div className="CompanyCard">
          <h3>{name}</h3>
          <p>{description}</p>
          <img src={logo_url} alt="Logo Not Found" ></img>
        </div>
      </Link>
    );
  }
}

export default CompanyCard;