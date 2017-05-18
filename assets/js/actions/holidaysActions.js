import key from '../globals/key';

export function addHolidays(holidays) {
  return { type: 'ADD_HOLIDAYS', holidays };
}

export function error() {
  return { type: 'ERROR' };
}

export function loadHolidays(year, month) {
  const url = `https://holidayapi.com/v1/holidays?key=${key}&country=BR&year=${year}&month=${month + 1}`;
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) => {
    if (key) {
      return axios.get(url).then(holidays =>
        resolve(dispatch(addHolidays({
          year,
          month,
          data: holidays.data.holidays,
        }))))
        .catch(() => reject(dispatch(error())));
    }
    return dispatch(error());
  });
}
