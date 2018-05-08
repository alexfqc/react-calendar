const makeEnDate = ({ month, year, day }) => `${year}-${month + 1 < 10 ?
  `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` :
  day}`;

const nameHoliday = ({ holidays, month, day, year }) => {
  if (holidays) {
    const holiday = holidays
                .find(({ date }) => date === makeEnDate({ month, year, day }));
    return (holiday && holiday.name) || '';
  }
  return '';
};

const setFirstWeek = ({ weekDays, weekday, days, lastMonth, holidays, month, year }) =>
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

const setMiddleWeek = ({ weekDays, initialValue, month, year, holidays }) =>
  weekDays.map((_, index) => {
    const day = initialValue + index + 1;
    return {
      value: day,
      class: '',
      month,
      holiday: nameHoliday({ holidays, month, day, year }),
    };
  });

const setLast2Weeks = ({ weekDays, initialValue, month, year, holidays, nextMonth, days }) =>
  weekDays.map((_, index) => {
    const day = initialValue + index + 1;
    if (initialValue + index + 1 > days[month] || initialValue < 10) {
      return {
        value: day > days[month] ? (day - days[month]) : day,
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

export const checkLeapYear = (year) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
    return [31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
  }
  return [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
};

export const setMonth = (month) => {
  const lastMonth = month === 0 ? 11 : month - 1;
  const nextMonth = month === 11 ? 0 : month + 1;

  return { lastMonth, month, nextMonth };
};

export const setWeeks = ({ weekday, days, lastMonth, holidays, month, year, nextMonth }) => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const firstWeek = setFirstWeek({ weekDays, weekday, days, lastMonth, holidays, month, year });
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
    days,
  });
  const sixthWeek = setLast2Weeks({
    weekDays,
    initialValue: fifthWeek[6].value,
    month,
    year,
    holidays,
    nextMonth,
    days,
  });
  return { firstWeek, secondWeek, thirdWeek, forthWeek, fifthWeek, sixthWeek };
};
