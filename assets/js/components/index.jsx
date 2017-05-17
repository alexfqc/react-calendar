import React from 'react';
import { render } from 'react-dom';
import { browserHistory, Router } from 'react-router';
import { Provider } from 'react-redux';
import routes from './routes';
import configureStore from '../store/configureStore';
import DevTools from './DevTools';

const isProduction = process.env.NODE_ENV === 'production';

const store = configureStore();

render(
  <Provider store={store} >
    <div>
      <Router history={browserHistory} routes={routes} />
      {!isProduction && <DevTools />}
    </div>
  </Provider>,
document.getElementById('root'));
