/* eslint-disable no-unused-expressions */
import React from 'react';
import { injectGlobal } from 'styled-components';
import Header from './header/Header';

injectGlobal`
  html, body {
    margin: 0;
  }
`;

const App = () => (
  <div>
    <Header />
  </div>
);
export default App;
