import React from 'react';
import { Route, Switch } from 'react-router';
import Loadable from 'react-loadable';

const Loading = () => <div>Loading...</div>;

const CalendarContainer = Loadable({
  loader: () => import('../CalendarContainer'),
  loading: Loading,
});

const Other = Loadable({
  loader: () => import('../Other'),
  loading: Loading,
});

const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={CalendarContainer} />
      <Route path="/other" exact component={Other} />
    </Switch>
  </main>
);

export default Main;
