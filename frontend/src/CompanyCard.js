import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Card, CardBody, CardTitle, CardImg } from 'reactstrap';
import './CompanyCard.css'

class CompanyCard extends Component {
  // Displays a card with company details and if you click it
  // brings up company details page
  render() {
    const { name, handle, description, logo_url } = this.props.company;
    return (
      <Link to={`/companies/${handle}`}>
        <Card className="CompanyCard my-3">
          <CardTitle>{name}</CardTitle>
          <CardBody><p>{description}</p></CardBody>
          <CardImg src={logo_url} alt="Logo Not Found" ></CardImg>
        </Card>
      </Link>
    );
  }
}

export default CompanyCard;