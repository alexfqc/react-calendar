import React from 'react';
import expect from 'expect';
import { render } from 'react-testing-library';
import { Calendar } from '../assets/js/components/calendar/Calendar';

const props = {
  year: 2017,
  month: 2,
  holidays: [
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
    {
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
    },
  ],
  loadHolidays: () => {},
};

it('should render', () => {
  const wrapper = render(<Calendar {...props} />);
  expect(wrapper).toBeDefined();
});

it('button render', () => {
  const wrapper = render(<Calendar {...props} />);
  expect(wrapper).toBeDefined();
});

// describe('Calendar should render correctly', () => {
//   const wrapper = mount(<Calendar {...props} />);

//   it('buttonLeft should be unique', () => {
//     const buttonLeft = wrapper.find('.button-content--left');
//     expect(buttonLeft.length).toEqual(1);
//   });

//   it('buttonRight should be unique', () => {
//     const buttonRight = wrapper.find('.button-content--right');
//     expect(buttonRight.length).toEqual(1);
//   });

//   it('should render currently month and year', () => {
//     const headerDate = wrapper.find('.calendar-header-date');

//     expect(headerDate.text()).toEqual('2017 February');
//     expect(headerDate.length).toEqual(1);
//   });

//   it('should render the weekdays keys and texts correctly', () => {
//     const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const weekdaysText = wrapper.find('.weekday').map(weekday => weekday.text());
//     const weekDaysKey = wrapper.find('.weekday').map(weekday => weekday.key());

//     expect(weekdaysText).toEqual(weekDays);
//     expect(weekDaysKey).toEqual(weekDays);
//   });

//   it('should render the weeks keys correctly', () => {
//     const weeks = wrapper.find('.week').map(week => week.key());
//     expect(weeks).toEqual(
  // [undefined, 'week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6']);
//   });

//   it('should render the days of first week (number) correctly', () => {
//     const week = wrapper.find('.week').at(1).children().map(day => day.text());
//     expect(week).toEqual(['29', '30', '31', '01', '02', '03', '04']);
//   });

//   it('should render the days of second week (number) correctly', () => {
//     const week = wrapper.find('.week').at(2).children().map(day => day.text());
//     expect(week).toEqual(['05', '06', '07', '08', '09', '10', '11']);
//   });

//   it('should render the days of third week (number) correctly', () => {
//     const week = wrapper.find('.week').at(3).children().map(day => day.text());
//     expect(week).toEqual(['12', '13', '14', '15', '16', '17', '18']);
//   });

//   it('should render the days of forth week (number) correctly', () => {
//     const week = wrapper.find('.week').at(4).children().map(day => day.text());
//     expect(week).toEqual(['19', '20', '21', '22', '23', '24', '25']);
//   });

//   it('should render the days of fifth week (number) correctly', () => {
//     const week = wrapper.find('.week').at(5).children().map(day => day.text());
//     expect(week).toEqual(['26', '27', '28', '01', '02', '03', '04']);
//   });

//   it('should render the days of sixtfh week (number) correctly', () => {
//     const week = wrapper.find('.week').at(6).children().map(day => day.text());
//     expect(week).toEqual(['05', '06', '07', '08', '09', '10', '11']);
//   });

//   it('holidays should be styled correctly', () => {
//     const holidays = wrapper.find('.day--holiday').map(d => d.text());
//     expect(holidays).toEqual(['28']);
//   });

//   it('Other months days should be styled correctly', () => {
//     const other = wrapper.find('.day--soft').map(d => d.text());
//     expect(other).toEqual(
  // ['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
//   });
// });

// describe('Previous Calendar should render correctly', () => {
//   const wrapper = mount(<Calendar {...props} />);
//   const buttonLeft = wrapper.find('.button-content--left');
//   buttonLeft.at(0).simulate('click');

//   it('buttonLeft should be unique', () => {
//     expect(buttonLeft.length).toEqual(1);
//   });

//   it('buttonRight should be unique', () => {
//     const buttonRight = wrapper.find('.button-content--right');
//     expect(buttonRight.length).toEqual(1);
//   });

//   it('should render currently month and year', () => {
//     const headerDate = wrapper.find('.calendar-header-date');

//     expect(headerDate.text()).toEqual('2017 January');
//     expect(headerDate.length).toEqual(1);
//   });

//   it('should render the weekdays keys and texts correctly', () => {
//     const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const weekdaysText = wrapper.find('.weekday').map(weekday => weekday.text());
//     const weekDaysKey = wrapper.find('.weekday').map(weekday => weekday.key());

//     expect(weekdaysText).toEqual(weekDays);
//     expect(weekDaysKey).toEqual(weekDays);
//   });

//   it('should render the weeks keys correctly', () => {
//     const weeks = wrapper.find('.week').map(week => week.key());
//     expect(weeks).toEqual(
  // [undefined, 'week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6']);
//   });

//   it('should render the days of first week (number) correctly', () => {
//     const week = wrapper.find('.week').at(1).children().map(day => day.text());
//     expect(week).toEqual(['01', '02', '03', '04', '05', '06', '07']);
//   });

//   it('should render the days of second week (number) correctly', () => {
//     const week = wrapper.find('.week').at(2).children().map(day => day.text());
//     expect(week).toEqual(['08', '09', '10', '11', '12', '13', '14']);
//   });

//   it('should render the days of third week (number) correctly', () => {
//     const week = wrapper.find('.week').at(3).children().map(day => day.text());
//     expect(week).toEqual(['15', '16', '17', '18', '19', '20', '21']);
//   });

//   it('should render the days of forth week (number) correctly', () => {
//     const week = wrapper.find('.week').at(4).children().map(day => day.text());
//     expect(week).toEqual(['22', '23', '24', '25', '26', '27', '28']);
//   });

//   it('should render the days of fifth week (number) correctly', () => {
//     const week = wrapper.find('.week').at(5).children().map(day => day.text());
//     expect(week).toEqual(['29', '30', '31', '01', '02', '03', '04']);
//   });

//   it('should render the days of sixtfh week (number) correctly', () => {
//     const week = wrapper.find('.week').at(6).children().map(day => day.text());
//     expect(week).toEqual(['05', '06', '07', '08', '09', '10', '11']);
//   });

//   it('holidays should be styled correctly', () => {
//     const holidays = wrapper.find('.day--holiday').map(d => d.text());
//     expect(holidays).toEqual(['01']);
//   });

//   it('Other months days should be styled correctly', () => {
//     const other = wrapper.find('.day--soft').map(d => d.text());
//     expect(other).toEqual(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
//   });
// });

// describe('Forward Calendar should render correctly', () => {
//   const wrapper = mount(<Calendar {...props} />);
//   wrapper.find('.button-content--left').at(0).simulate('click');
//   wrapper.find('.button-content--right').at(0).simulate('click');

//   it('buttonLeft should be unique', () => {
//     const buttonLeft = wrapper.find('.button-content--left');
//     expect(buttonLeft.length).toEqual(1);
//   });

//   it('buttonRight should be unique', () => {
//     const buttonRight = wrapper.find('.button-content--right');
//     expect(buttonRight.length).toEqual(1);
//   });

//   it('should render currently month and year', () => {
//     const headerDate = wrapper.find('.calendar-header-date');

//     expect(headerDate.text()).toEqual('2017 February');
//     expect(headerDate.length).toEqual(1);
//   });

//   it('should render the weekdays keys and texts correctly', () => {
//     const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
//     const weekdaysText = wrapper.find('.weekday').map(weekday => weekday.text());
//     const weekDaysKey = wrapper.find('.weekday').map(weekday => weekday.key());

//     expect(weekdaysText).toEqual(weekDays);
//     expect(weekDaysKey).toEqual(weekDays);
//   });

//   it('should render the weeks keys correctly', () => {
//     const weeks = wrapper.find('.week').map(week => week.key());
//     expect(weeks).toEqual(
  // [undefined, 'week-1', 'week-2', 'week-3', 'week-4', 'week-5', 'week-6']);
//   });

//   it('should render the days of first week (number) correctly', () => {
//     const week = wrapper.find('.week').at(1).children().map(day => day.text());
//     expect(week).toEqual(['29', '30', '31', '01', '02', '03', '04']);
//   });

//   it('should render the days of second week (number) correctly', () => {
//     const week = wrapper.find('.week').at(2).children().map(day => day.text());
//     expect(week).toEqual(['05', '06', '07', '08', '09', '10', '11']);
//   });

//   it('should render the days of third week (number) correctly', () => {
//     const week = wrapper.find('.week').at(3).children().map(day => day.text());
//     expect(week).toEqual(['12', '13', '14', '15', '16', '17', '18']);
//   });

//   it('should render the days of forth week (number) correctly', () => {
//     const week = wrapper.find('.week').at(4).children().map(day => day.text());
//     expect(week).toEqual(['19', '20', '21', '22', '23', '24', '25']);
//   });

//   it('should render the days of fifth week (number) correctly', () => {
//     const week = wrapper.find('.week').at(5).children().map(day => day.text());
//     expect(week).toEqual(['26', '27', '28', '01', '02', '03', '04']);
//   });

//   it('should render the days of sixtfh week (number) correctly', () => {
//     const week = wrapper.find('.week').at(6).children().map(day => day.text());
//     expect(week).toEqual(['05', '06', '07', '08', '09', '10', '11']);
//   });

//   it('holidays should be styled correctly', () => {
//     const holidays = wrapper.find('.day--holiday').map(d => d.text());
//     expect(holidays).toEqual(['28']);
//   });

//   it('Other months days should be styled correctly', () => {
//     const other = wrapper.find('.day--soft').map(d => d.text());
//     expect(other).toEqual(
//  ['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
//   });
// });
