import React from 'react';
import { shallow } from 'enzyme';
import JobCard from './JobCard';

const testJob = {
  "id": 1,
  "title": "Editor, magazine features",
  "company_handle": "foster-rice",
  "salary": 118000,
  "equity": 0.15,
  "state": null
}

it('renders without crashing', function () {
  shallow(<JobCard job={testJob} />);
});