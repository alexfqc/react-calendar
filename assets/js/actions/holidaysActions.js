import * as api from '../globals/api';

export function addHolidays(holidays) {
  return { type: 'ADD_HOLIDAYS', holidays };
}


export function loadHolidays(year, month) {
  const country = api.country === '' ? 'BR' : api.country;
  const url = `https://holidayapi.com/v1/holidays?key=${api.key}&country=${country}&year=${year}&month=${month + 1}`;
  return (dispatch, getState, { axios }) => new Promise((resolve, reject) => {
    if (api.key) {
      return axios.get(url).then(holidays =>
        resolve(dispatch(addHolidays({
          year,
          month,
          data: holidays.data.holidays,
        }))))
        .catch(() => reject(dispatch({ type: '' })));
    }
    return dispatch({ type: '' });
  });
}
