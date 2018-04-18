import React from 'react';
import { Route, Switch } from 'react-router';
import CalendarContainer from '../CalendarContainer';
import Other from '../Other';

const Main = () => (
  <main>
    <Switch>
      <Route path="/" exact component={CalendarContainer} />
      <Route path="/other" exact component={Other} />
    </Switch>
  </main>
);

export default Main;
