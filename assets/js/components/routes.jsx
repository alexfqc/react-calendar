import React from 'react';
import { Route, IndexRoute } from 'react-router';
import App from './App';
import CalendarContainer from './CalendarContainer';
import Other from './Other';

export default (
  <Route path="/dist/" component={App}>
    <IndexRoute component={CalendarContainer} />
    <Route path="other" component={Other} />
  </Route>
);
