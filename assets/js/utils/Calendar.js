export const MONTH_DAYS = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

export const MONTHS = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
];

export const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

const makeEnDate = ({ month, year, day }) => `${year}-${month + 1 < 10 ?
  `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` :
  day}`;

const nameHoliday = ({ holidays, month, day, year }) => {
  if (holidays) {
    const holiday = holidays
                .find(holidayData => holidayData.date === makeEnDate({ month, year, day }));
    return (holiday && holiday.name) || '';
  }
  return '';
};

export const checkLeapYear = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

export const setMonth = (date) => {
  const month = date.getMonth();
  const lastMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;

  return { lastMonth, month, nextMonth };
};

export const setFirstWeek = ({ weekday, days, lastMonth, holidays, month, year }) =>
  weekDays.map((_, index) => {
    if (index < weekday) {
      const value = (days[lastMonth] - (weekday - index)) + 1;
      return {
        value,
        class: 'soft',
        month: lastMonth,
        holiday: nameHoliday({ holidays, month, day: value, year }),
      };
    }
    const value = (index - weekday) + 1;
    return {
      value: (index - weekday) + 1,
      class: '',
      month,
      holiday: nameHoliday({ holidays, month, day: value, year }),
    };
  });

export const setMiddleWeek = ({ initialValue, month, year, holidays }) =>
  weekDays.map((_, index) => {
    const day = initialValue + index + 1;
    return {
      value: day,
      class: '',
      month,
      holiday: nameHoliday({ holidays, month, day, year }),
    };
  });

export const setLast2Weeks = ({ initialValue, month, year, holidays, nextMonth }) =>
  weekDays.map((_, index) => {
    const day = initialValue + index + 1;
    if (initialValue + index + 1 > MONTH_DAYS[month] || initialValue < 10) {
      return {
        value: day > MONTH_DAYS[month] ? (day - MONTH_DAYS[month]) : day,
        class: 'soft',
        month: nextMonth,
        holiday: '',
      };
    }

    return {
      value: day,
      class: '',
      month,
      holiday: nameHoliday({ holidays, month, day, year }),
    };
  });

export const setWeeks = ({ weekday, days, lastMonth, holidays, month, year, nextMonth }) => {
  const firstWeek = setFirstWeek({ weekday, days, lastMonth, holidays, month, year });
  const secondWeek = setMiddleWeek({
    weekDays,
    initialValue: firstWeek[6].value,
    month,
    year,
    holidays,
  });
  const thirdWeek = setMiddleWeek({
    weekDays,
    initialValue: secondWeek[6].value,
    month,
    year,
    holidays,
  });
  const forthWeek = setMiddleWeek({
    weekDays,
    initialValue: thirdWeek[6].value,
    month,
    year,
    holidays,
  });
  const fifthWeek = setLast2Weeks({
    weekDays,
    initialValue: forthWeek[6].value,
    month,
    year,
    holidays,
    nextMonth,
  });
  const sixthWeek = setLast2Weeks({
    weekDays,
    initialValue: fifthWeek[6].value,
    month,
    year,
    holidays,
    nextMonth,
  });
  return { firstWeek, secondWeek, thirdWeek, forthWeek, fifthWeek, sixthWeek };
};
