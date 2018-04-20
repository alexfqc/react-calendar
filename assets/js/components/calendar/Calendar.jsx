import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as holidaysActions from '../../actions/holidaysActions';
import CalendarStyled from './Calendar.style';

export class Calendar extends React.Component {
  constructor() {
    super();
    this.state = {
      days: [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31],
      months: [
        'January', 'February', 'March', 'April', 'May', 'June',
        'July', 'August', 'September', 'October', 'November', 'December',
      ],
      weekDays: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
      lastMonth: 11,
      month: 0,
      nextMonth: 1,
      year: 0,
      currentMonth: 0,
      currentYear: 0,
      calendar: [
        { id: 'week-1', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-2', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-3', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-4', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-5', data: [0, 0, 0, 0, 0, 0, 0] },
        { id: 'week-6', data: [0, 0, 0, 0, 0, 0, 0] },
      ],
      holidays: [],
      holiday: '',
    };

    this.previousCalendar = this.previousCalendar.bind(this);
    this.nextCalendar = this.nextCalendar.bind(this);
  }

  componentWillMount() {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const year = this.props.year < 100 ? currentYear : this.props.year;
    const month = this.props.month < 1 ||
                  this.props.month > 12 ||
                  (this.props.year === 0 && this.props.month === 0) ?
                  currentMonth :
                  this.props.month - 1;

    this.setState({
      currentMonth,
      currentYear,
      month,
      year,
      holidays: [...this.props.holidays],
    });

    this.getMonthHoliday(year, month, this.props.holidays, currentYear, currentMonth);
  }

  componentWillReceiveProps({ holidays }) {
    if (holidays !== this.props.holidays) {
      this.setState({ holidays: [...holidays] });
      if (!(!!holidays[0] && !!holidays[0].error)) {
        this.getMonthHoliday(this.state.year, this.state.month, holidays);
      }
    }
  }

  getMonthHoliday(year, month, holidays, currentYear, currentMonth) {
    const cYear = currentYear !== undefined ? currentYear : this.state.currentYear;
    const cMonth = currentMonth !== undefined ? currentMonth : this.state.currentMonth;
    this.setState({ year, month });
    const pastDate = (year === cYear && month < cMonth)
                      || year < cYear;
    if (pastDate) {
      const holi = holidays.filter(h => h.year === year && h.month === month)[0];
      if (!(!!holidays[0] && !!holidays[0].error)) {
        if (!holi) {
          this.props.loadHolidays(year, month);
        } else {
          this.setCalendar(new Date(year, month, 1), holi.data);
        }
      } else {
        this.setCalendar(new Date(year, month, 1));
      }
    } else {
      this.setCalendar(new Date(year, month, 1));
    }
  }

  setMonth(date) {
    const month = date.getMonth();
    const lastMonth = month === 0 ? 11 : month - 1;
    const nextMonth = month === 11 ? 0 : month + 1;

    this.setState({
      lastMonth,
      month,
      nextMonth,
    });

    return { lastMonth, month, nextMonth };
  }

  setCalendar(date, holidays) {
    const { lastMonth, month, nextMonth } = this.setMonth(date);
    const year = date.getFullYear();
    const weekday = date.getDay();
    const days = this.checkLeapYear(year);
    let nextMonthDay = 0;

    const firstWeek = this.state.weekDays.map((day, index) => {
      let holiday = '';
      if (index < weekday) {
        const value = (days[lastMonth] - (weekday - index)) + 1;
        return {
          value,
          class: 'soft',
          month: lastMonth,
          holiday,
        };
      }
      const value = (index - weekday) + 1;
      if (holidays !== undefined) {
        holiday = holidays
                    .find(h => h.date === `${year}-${month + 1 < 10 ?
                                          `0${month + 1}` : month + 1}-${value < 10 ? `0${value}` :
                                          value}`);
        holiday = holiday === undefined ? '' : holiday.name;
      }
      return {
        value: (index - weekday) + 1,
        class: '',
        month,
        holiday,
      };
    });
    const secondWeek = this.state.weekDays.map((day, index) => {
      const value = firstWeek[6].value + index + 1;
      let holiday = '';
      if (holidays !== undefined) {
        holiday = holidays
                    .find(h => h.date === `${year}-${month + 1 < 10 ?
                                          `0${month + 1}` : month + 1}-${value < 10 ? `0${value}` :
                                          value}`);
        holiday = holiday === undefined ? '' : holiday.name;
      }
      return {
        value,
        class: '',
        month,
        holiday,
      };
    });
    const thirdWeek = this.state.weekDays.map((day, index) => {
      const value = secondWeek[6].value + index + 1;
      let holiday = '';
      if (holidays !== undefined) {
        holiday = holidays
                    .find(h => h.date === `${year}-${month + 1 < 10 ?
                                          `0${month + 1}` : month + 1}-${value < 10 ? `0${value}` :
                                          value}`);
        holiday = holiday === undefined ? '' : holiday.name;
      }
      return {
        value,
        class: '',
        month,
        holiday,
      };
    });
    const forthWeek = this.state.weekDays.map((day, index) => {
      const value = thirdWeek[6].value + index + 1;
      let holiday = '';
      if (holidays !== undefined) {
        holiday = holidays
                    .find(h => h.date === `${year}-${month + 1 < 10 ?
                                          `0${month + 1}` : month + 1}-${value < 10 ? `0${value}` :
                                          value}`);
        holiday = holiday === undefined ? '' : holiday.name;
      }
      return {
        value,
        class: '',
        month,
        holiday,
      };
    });
    const fifthWeek = this.state.weekDays.map((day, index) => {
      let holiday = '';
      if (forthWeek[6].value + index + 1 > days[month]) {
        nextMonthDay += 1;
        return {
          value: nextMonthDay,
          class: 'soft',
          month: nextMonth,
          holiday,
        };
      }
      const value = forthWeek[6].value + index + 1;
      if (holidays !== undefined) {
        holiday = holidays
                    .find(h => h.date === `${year}-${month + 1 < 10 ?
                                          `0${month + 1}` : month + 1}-${value < 10 ? `0${value}` :
                                          value}`);
        holiday = holiday === undefined ? '' : holiday.name;
      }
      return {
        value,
        class: '',
        month,
        holiday,
      };
    });
    const sixthWeek = this.state.weekDays.map((day, index) => {
      let holiday = '';
      if (fifthWeek[6].value + index + 1 > days[month] || fifthWeek[6].value < 10) {
        nextMonthDay += 1;
        return {
          value: nextMonthDay,
          class: 'soft',
          month: nextMonth,
          holiday,
        };
      }

      const value = fifthWeek[6].value + index + 1;
      if (holidays !== undefined) {
        holiday = holidays
                    .find(h => h.date === `${year}-${month + 1 < 10 ?
                                          `0${month + 1}` : month + 1}-${value < 10 ? `0${value}` :
                                          value}`);
        holiday = holiday === undefined ? '' : holiday.name;
      }
      return {
        value,
        class: '',
        month,
        holiday,
      };
    });

    this.setState({
      month,
      year,
      calendar: [
        { id: 'week-1', data: firstWeek },
        { id: 'week-2', data: secondWeek },
        { id: 'week-3', data: thirdWeek },
        { id: 'week-4', data: forthWeek },
        { id: 'week-5', data: fifthWeek },
        { id: 'week-6', data: sixthWeek },
      ],
    });
  }

  checkLeapYear(year) {
    let days = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
      days = [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
    }
    this.setState({
      days,
    });
    return days;
  }

  previousCalendar() {
    const month = this.state.month !== 0 ? this.state.month - 1 : 11;
    const year = this.state.month !== 0 ? this.state.year : this.state.year - 1;
    this.getMonthHoliday(year, month, this.state.holidays);
  }

  nextCalendar() {
    const month = this.state.month !== 11 ? this.state.month + 1 : 0;
    const year = this.state.month !== 11 ? this.state.year : this.state.year + 1;
    this.getMonthHoliday(year, month, this.state.holidays);
  }

  render() {
    const {
      calendar,
      holiday,
      month,
      months,
      weekDays,
      year,
    } = this.state;
    return (
      <CalendarStyled>
        <header>
          <span className="wrapper">
            <button onClick={this.previousCalendar} className="left" />
          </span>
          <span className="calendar-header-date">{`${year} ${months[month]}`}</span>
          <span className="wrapper">
            <button onClick={this.nextCalendar} className="right" />
          </span>
        </header>
        <div className="week">
          {weekDays.map(weekDay => <div key={weekDay} className="weekday">{weekDay}</div>)}
        </div>
        {calendar.map(week =>
          <div key={week.id} className="week">
            {week.data.map(day =>
              <div
                key={`${day.month}${day.value}`}
                className={`day ${day.holiday !== '' ? 'holiday' : day.class}`}
                onMouseOver={() => { if (day.holiday !== '') { this.setState({ holiday: day.holiday }); } }}
                onMouseOut={() => { this.setState({ holiday: '' }); }}
              >
                {day.value < 10 && day.value !== ' ' ? `0${day.value}` : day.value}
              </div>,
            )}
          </div>,
        )}
        <div className={`name ${holiday !== '' ? 'show' : ''}`}>{holiday}</div>
      </CalendarStyled>
    );
  }
}

Calendar.defaultProps = {
  year: 0,
  month: 0,
};

Calendar.propTypes = {
  year: PropTypes.number,
  month: PropTypes.number,
  loadHolidays: PropTypes.func.isRequired,
  holidays: PropTypes.arrayOf(
    PropTypes.shape({
      year: PropTypes.number,
      month: PropTypes.number,
      holidays: PropTypes.arrayOf(
        PropTypes.shape({
          name: PropTypes.string,
          date: PropTypes.string,
          observed: PropTypes.string,
          public: PropTypes.boolean,
        }),
      ),
      error: PropTypes.string,
    }),
  ).isRequired,
};

const mapStateToProps = (state, ownProps) =>
  ({
    holidays: state.holidays,
    year: ownProps.year,
    month: ownProps.month,
  });

const mapDispatchToProps = dispatch =>
  ({
    loadHolidays: (year, month) => dispatch(holidaysActions.loadHolidays(year, month)),
  });

export default connect(mapStateToProps, mapDispatchToProps)(Calendar);
