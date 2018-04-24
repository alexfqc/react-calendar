const makeEnDate = ({ month, year, day }) => `${year}-${month + 1 < 10 ?
  `0${month + 1}` : month + 1}-${day < 10 ? `0${day}` :
  day}`;

export const nameHoliday = ({ holidays, month, day, year }) => {
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
