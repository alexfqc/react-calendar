import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './App';
import configureStore from '../store/configureStore';

const store = configureStore();

const render = (Component) => {
  ReactDOM.render(
    <Provider store={store} >
      <BrowserRouter>
        <Component />
      </BrowserRouter>
    </Provider>,
  document.getElementById('root'));
};

render(App);

if (process.env.NODE_ENV === 'development') {
  module.hot.accept('./App', () => {
    render(App);
  });
}
