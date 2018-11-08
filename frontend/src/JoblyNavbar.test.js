import React from 'react';
import { shallow } from 'enzyme';
import JoblyNavbar from './JoblyNavbar';

it('renders without crashing', function () {
  shallow(<JoblyNavbar />);
});