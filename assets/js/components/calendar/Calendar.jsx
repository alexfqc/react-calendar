import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as holidaysActions from '../../actions/holidaysActions';
import CalendarStyled from './Calendar.style';
import { checkLeapYear, setMonth, setWeeks } from '../../utils/Calendar';

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
        { id: 'week-1', data: Array.from({ length: 7 }).fill(0) },
        { id: 'week-2', data: Array.from({ length: 7 }).fill(0) },
        { id: 'week-3', data: Array.from({ length: 7 }).fill(0) },
        { id: 'week-4', data: Array.from({ length: 7 }).fill(0) },
        { id: 'week-5', data: Array.from({ length: 7 }).fill(0) },
        { id: 'week-6', data: Array.from({ length: 7 }).fill(0) },
      ],
      holidays: [],
      holiday: '',
    };

    this.previousCalendar = this.previousCalendar.bind(this);
    this.nextCalendar = this.nextCalendar.bind(this);
  }

  componentWillMount() {
    const { holidays, year, month } = this.props;
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const newYear = year < 100 ? currentYear : year;
    const newMonth = month < 1 || month > 12 || (year === 0 && month === 0) ?
                  currentMonth :
                  month - 1;

    this.setState({
      currentMonth,
      currentYear,
      newMonth,
      year: newYear,
      holidays,
    });

    this.getMonthHoliday(newYear, newMonth, this.props.holidays, currentYear, currentMonth);
  }

  componentWillReceiveProps({ holidays }) {
    if (holidays !== this.props.holidays) {
      this.setState({ holidays });
      this.getMonthHoliday(this.state.year, this.state.month, holidays);
    }
  }

  getMonthHoliday(
    year,
    month,
    holidays,
    currentYear = this.state.currentYear,
    currentMonth = this.state.currentMonth,
  ) {
    const pastDate = (year === currentYear && month < currentMonth)
                      || year < currentYear;

    if (!pastDate) {
      this.setCalendar(new Date(year, month, 1));
    } else {
      const holiday = holidays.filter(h => h.year === year && h.month === month)[0];
      if (!holiday) {
        this.setCalendar(new Date(year, month, 1));
        this.props.loadHolidays(year, month);
      } else {
        this.setCalendar(new Date(year, month, 1), holiday.data);
      }
    }
  }

  setCalendar(date, holidays) {
    const { lastMonth, month, nextMonth } = setMonth(date);
    const weekDays = Array.from({ length: 7 }).fill(1);
    const year = date.getFullYear();
    const weekday = date.getDay();
    const days = checkLeapYear(year);

    const {
      firstWeek,
      secondWeek,
      thirdWeek,
      forthWeek,
      fifthWeek,
      sixthWeek,
    } = setWeeks({
      weekDays,
      weekday,
      days,
      lastMonth,
      holidays,
      month,
      year,
      nextMonth,
    });

    this.setState({
      days,
      lastMonth,
      month,
      nextMonth,
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

  previousCalendar() {
    const { month, year, holidays } = this.state;
    const previousMonth = month !== 0 ? month - 1 : 11;
    const previousYear = month !== 0 ? year : year - 1;
    this.getMonthHoliday(previousYear, previousMonth, holidays);
  }

  nextCalendar() {
    const { month, year, holidays } = this.state;
    const nextMonth = month !== 11 ? month + 1 : 0;
    const nextYear = month !== 11 ? year : year + 1;
    this.getMonthHoliday(nextYear, nextMonth, holidays);
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
            <button onClick={this.previousCalendar} className="left" data-testid="btn-left" />
          </span>
          <span data-testid="date">{`${year} ${months[month]}`}</span>
          <span className="wrapper">
            <button onClick={this.nextCalendar} className="right" data-testid="btn-right" />
          </span>
        </header>
        <div className="week" data-testid="weekdays">
          {weekDays.map(weekDay => <div key={weekDay} className="weekday">{weekDay}</div>)}
        </div>
        {calendar.map(week =>
          <div key={week.id} className="week">
            {week.data.map(day =>
              <div
                key={`${day.month}${day.value}${day.class}`}
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
