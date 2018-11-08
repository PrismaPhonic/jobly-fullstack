import React from 'react';
import { shallow } from 'enzyme';
import Company from './Company';

const match = {
  params: {
    handle: 'anderson-arias-and-morrow'
  }
}

it('renders without crashing', function () {
  shallow(<Company match={match} />);
});