import test from 'ava';
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import Other from '../assets/js/components/Other';

Enzyme.configure({ adapter: new Adapter() });

test('has a .Foo class name', (t) => {
  const wrapper = shallow(<Other />);
  t.pass(wrapper);
});
