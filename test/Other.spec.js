import test from 'ava';
import React from 'react';
// import expect from 'expect';
import { renderIntoDocument } from 'react-testing-library';
import Other from '../assets/js/components/Other';

// afterEach(cleanup);

test('has a .Foo class name', (t) => {
  renderIntoDocument(<Other />);
  t.pass();
});
