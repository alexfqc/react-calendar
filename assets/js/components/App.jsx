/* eslint-disable no-unused-expressions */
import React from 'react';
import { injectGlobal } from 'styled-components';
import Header from './header/Header';
import Main from './main/Main';

injectGlobal`
  html, body {
    margin: 0;
  }
`;

const App = () => (
  <div>
    <Header />
    <Main />
  </div>
);
export default App;
