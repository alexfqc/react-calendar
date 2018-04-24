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

export const t = () => {};
