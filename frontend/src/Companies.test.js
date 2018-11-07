import React from 'react';
import { shallow } from 'enzyme';
import Companies from './Companies';

it('renders without crashing', function () {
  shallow(<Companies />);
});