import React from 'react';
/* eslint import/no-named-as-default:"off" */
import Calendar from './Calendar';
/* eslint-enable import/no-named-as-default */

class CalendarContainer extends React.Component {
  constructor() {
    super();
    this.state = {
      title: 'Container',
    };
  }

  render() {
    const style = {
      float: 'left',
      position: 'relative',
      fontFamily: 'Lato',
      paddingLeft: '20px',
      width: '100%',
    };
    return (
      <div style={style}>
        <h2>{this.state.title}</h2>
        <Calendar />
      </div>
    );
  }
}

export default CalendarContainer;
