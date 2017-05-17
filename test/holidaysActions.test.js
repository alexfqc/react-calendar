import expect from 'expect';
import thunk from 'redux-thunk';
import configureMockStore from 'redux-mock-store';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import key from '../assets/js/globals/key';
import * as holidaysActions from '../assets/js/actions/holidaysActions';

describe('holidays Actions', () => {
  describe('sync Actions', () => {
    it('addHolidays should return the object correctly', () => {
      const holidays = [
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
      const expectedAction = {
        type: 'ADD_HOLIDAYS',
        holidays,
      };
      const action = holidaysActions.addHolidays(holidays);
      expect(action).toEqual(expectedAction);
    });
  });


  describe('async actions', () => {
    if (key) {
      it('should get holidays at month and return an object', (done) => {
        const mock = new MockAdapter(axios);

        mock.onGet(`https://holidayapi.com/v1/holidays?key=${key}&country=BR&year=2017&month=2`).reply(200, {
          holidays: [
            {
              name: 'Carnaval',
              date: '2017-02-28',
              observed: '2017-02-28',
              public: false,
            },
          ],
        });


        const middleware = [thunk.withExtraArgument({ axios })];
        const mockStore = configureMockStore(middleware);

        const expectedAction = {
          type: 'ADD_HOLIDAYS',
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

        const store = mockStore({ holidays: [] }, expectedAction);
        store.dispatch(holidaysActions.loadHolidays(2017, 1)).then(() => {
          const actions = store.getActions();
          expect(actions[0].type).toEqual('ADD_HOLIDAYS');
          expect(actions[0].holidays.year).toEqual(2017);
          expect(actions[0].holidays.month).toEqual(1);
          expect(actions[0].holidays.data[0].name).toEqual('Carnaval');
          expect(actions[0].holidays.data[0].date).toEqual('2017-02-28');
        });
        done();
      });
    }
  });
});
