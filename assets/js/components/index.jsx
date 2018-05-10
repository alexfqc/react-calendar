import React from 'react';
import { render } from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from '../store/configureStore';

const store = configureStore();

render(
  <Provider store={store} >
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>,
document.getElementById('root'));

if (process.env.NODE_ENV === 'development') {
  module.hot.accept();
}
