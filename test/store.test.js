import expect from 'expect';
import { createStore } from 'redux';
import * as holidaysActions from '../assets/js/actions/holidaysActions';
import initialState from '../assets/js/reducers/initialState';
import rootReducer from '../assets/js/reducers/index';

describe('Store', () => {
  it('Should handle adding holidays', () => {
    const store = createStore(rootReducer, initialState);
    const holidays = {
      holidays: {
        year: 2017,
        month: 1,
        data: [
          {
            name: 'Carnaval',
            date: '2017-02-28',
            observed: '2017-02-28',
            public: false,
          },
        ],
      },
    };
    const action = holidaysActions.addHolidays(holidays);
    store.dispatch(action);

    const actual = store.getState().holidays[0];
    expect(actual).toEqual(holidays);
  });
});
