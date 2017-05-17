import expect from 'expect';
import * as holidaysActions from '../assets/js/actions/holidaysActions';
import holidaysReducer from '../assets/js/reducers/holidaysReducer';

describe('Holidays reuducer', () => {
  it('should add month holidays at initialState empty', () => {
    const initialState = [];
    const holidays = {
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
    };

    const action = holidaysActions.addHolidays(holidays);

    const newState = holidaysReducer(initialState, action);

    expect(newState.length).toEqual(1);
    expect(newState[0].year).toEqual(2017);
    expect(newState[0].month).toEqual(1);
  });

  it('should add month holidays at initialState having an object', () => {
    const initialState = [
      {
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
    ];
    const holidays = {
      year: 2017,
      month: 0,
      data: [
        {
          name: 'Dia do Ano Novo',
          date: '2017-01-01',
          observed: '2017-01-01',
          public: false,
        },
      ],
    };

    const action = holidaysActions.addHolidays(holidays);

    const newState = holidaysReducer(initialState, action);

    expect(newState.length).toEqual(2);
    expect(newState[1].year).toEqual(2017);
    expect(newState[1].month).toEqual(0);
  });
});
