import React from 'react';
import { shallow } from 'enzyme';
import CompanyCard from './CompanyCard';

const testCompany = {
  "handle": "anderson-arias-and-morrow",
  "name": "Anderson, Arias and Morrow",
  "description": "Somebody program how I. Face give away discussion view act inside. Your official relationship administration here.",
  "logo_url": ""
}

it('renders without crashing', function () {
  shallow(<CompanyCard company={testCompany} />);
});