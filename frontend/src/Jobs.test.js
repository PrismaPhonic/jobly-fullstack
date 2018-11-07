import React from 'react';
import { shallow } from 'enzyme';
import Jobs from './Jobs';

it('renders without crashing', function () {
  shallow(<Jobs />);
});