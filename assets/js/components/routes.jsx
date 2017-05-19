import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';

function errorLoading(err) {
  throw err;
}
function loadRoute(cb) {
  return module => cb(null, module.default);
}


export default (
  <Route path="/dist/" component={App}>
    <IndexRoute
      getComponent={(location, cb) => {
        System.import('./CalendarContainer')
              .then(loadRoute(cb))
              .catch(errorLoading);
      }}
    />
    <Route
      path="other"
      getComponent={(location, cb) => {
        System.import('./Other')
              .then(loadRoute(cb))
              .catch(errorLoading);
      }}
    />
  </Route>
);
