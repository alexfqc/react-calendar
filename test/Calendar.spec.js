import React from 'react';
import { render, Simulate, wait, cleanup } from 'react-testing-library';
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

afterEach(cleanup);

it('should render', () => {
  const wrapper = render(<Calendar {...props} />);
  expect(wrapper).toBeDefined();
});

it('should contain button left', () => {
  const { getByTestId } = render(<Calendar {...props} />);
  expect(getByTestId('btn-left')).toBeDefined();
});

it('should contain button right', () => {
  const { getByTestId } = render(<Calendar {...props} />);
  expect(getByTestId('btn-right')).toBeDefined();
});

it('should render currently month and year', () => {
  const { getByTestId } = render(<Calendar {...props} />);
  expect(getByTestId('date')).toHaveTextContent('2017 February');
});

it('should render the weekdays keys and texts correctly', () => {
  const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const { getByTestId } = render(<Calendar {...props} />);
  const elements = getByTestId('weekdays').childNodes;

  const wk = Array.from(elements).map(el => el.innerHTML);
  expect(wk).toEqual(weekDays);
});

it('should render the days of first week (number) correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const [, first] = container.querySelectorAll('.week');
  const resultDays = Array.from(first.childNodes).map(day => day.innerHTML);
  expect(resultDays).toEqual(['29', '30', '31', '01', '02', '03', '04']);
});

it('should render the days of second week (number) correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const [, , second] = container.querySelectorAll('.week');
  const resultDays = Array.from(second.childNodes).map(day => day.innerHTML);
  expect(resultDays).toEqual(['05', '06', '07', '08', '09', '10', '11']);
});

it('should render the days of third week (number) correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const [, , , third] = container.querySelectorAll('.week');
  const resultDays = Array.from(third.childNodes).map(day => day.innerHTML);
  expect(resultDays).toEqual(['12', '13', '14', '15', '16', '17', '18']);
});

it('should render the days of fourth week (number) correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const [, , , , fourth] = container.querySelectorAll('.week');
  const resultDays = Array.from(fourth.childNodes).map(day => day.innerHTML);
  expect(resultDays).toEqual(['19', '20', '21', '22', '23', '24', '25']);
});

it('should render the days of fifth week (number) correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const [, , , , , fifth] = container.querySelectorAll('.week');
  const resultDays = Array.from(fifth.childNodes).map(day => day.innerHTML);
  expect(resultDays).toEqual(['26', '27', '28', '01', '02', '03', '04']);
});

it('should render the days of sixtfh week (number) correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const [, , , , , , sixtfh] = container.querySelectorAll('.week');
  const resultDays = Array.from(sixtfh.childNodes).map(day => day.innerHTML);
  expect(resultDays).toEqual(['05', '06', '07', '08', '09', '10', '11']);
});

it('holidays should be styled correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const holidays = Array.from(container.querySelectorAll('.holiday')).map(day => day.innerHTML);
  expect(holidays).toEqual(['28']);
});

it('Other months days should be styled correctly', () => {
  const { container } = render(<Calendar {...props} />);
  const soft = Array.from(container.querySelectorAll('.soft')).map(day => day.innerHTML);
  expect(soft).toEqual(['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
});

describe('Previous Calendar should render correctly', () => {
  it('should render currently month and year', async () => {
    const { getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => getByTestId('date'));
    expect(getByTestId('date')).toHaveTextContent('2017 January');
  });

  it('should render the days of first week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.week'));
    const [, first] = container.querySelectorAll('.week');
    const resultDays = Array.from(first.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['01', '02', '03', '04', '05', '06', '07']);
  });

  it('should render the days of second week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , second] = container.querySelectorAll('.week');
    const resultDays = Array.from(second.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['08', '09', '10', '11', '12', '13', '14']);
  });

  it('should render the days of third week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , third] = container.querySelectorAll('.week');
    const resultDays = Array.from(third.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['15', '16', '17', '18', '19', '20', '21']);
  });

  it('should render the days of fourth week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , , fourth] = container.querySelectorAll('.week');
    const resultDays = Array.from(fourth.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['22', '23', '24', '25', '26', '27', '28']);
  });

  it('should render the days of fifth week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , , , fifth] = container.querySelectorAll('.week');
    const resultDays = Array.from(fifth.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['29', '30', '31', '01', '02', '03', '04']);
  });

  it('should render the days of sixth week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , , , , sixth] = container.querySelectorAll('.week');
    const resultDays = Array.from(sixth.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['05', '06', '07', '08', '09', '10', '11']);
  });

  it('holidays should be styled correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.holiday'));
    const holidays = Array.from(container.querySelectorAll('.holiday')).map(day => day.innerHTML);
    expect(holidays).toEqual(['01']);
  });

  it('Other months days should be styled correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    await wait(() => container.querySelectorAll('.soft'));
    const soft = Array.from(container.querySelectorAll('.soft')).map(day => day.innerHTML);
    expect(soft).toEqual(['01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
  });
});

describe('Forward Calendar should render correctly', () => {
  it('should render currently month and year', async () => {
    const { getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => getByTestId('date'));
    expect(getByTestId('date')).toHaveTextContent('2017 February');
  });

  it('should render the days of first week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.week'));
    const [, first] = container.querySelectorAll('.week');
    const resultDays = Array.from(first.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['29', '30', '31', '01', '02', '03', '04']);
  });

  it('should render the days of second week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , second] = container.querySelectorAll('.week');
    const resultDays = Array.from(second.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['05', '06', '07', '08', '09', '10', '11']);
  });

  it('should render the days of third week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , third] = container.querySelectorAll('.week');
    const resultDays = Array.from(third.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['12', '13', '14', '15', '16', '17', '18']);
  });

  it('should render the days of fourth week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , , fourth] = container.querySelectorAll('.week');
    const resultDays = Array.from(fourth.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['19', '20', '21', '22', '23', '24', '25']);
  });

  it('should render the days of fifth week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , , , fifth] = container.querySelectorAll('.week');
    const resultDays = Array.from(fifth.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['26', '27', '28', '01', '02', '03', '04']);
  });

  it('should render the days of sixth week (number) correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.week'));
    const [, , , , , , sixth] = container.querySelectorAll('.week');
    const resultDays = Array.from(sixth.childNodes).map(day => day.innerHTML);
    expect(resultDays).toEqual(['05', '06', '07', '08', '09', '10', '11']);
  });

  it('holidays should be styled correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.holiday'));
    const holidays = Array.from(container.querySelectorAll('.holiday')).map(day => day.innerHTML);
    expect(holidays).toEqual(['28']);
  });

  it('Other months days should be styled correctly', async () => {
    const { container, getByTestId } = render(<Calendar {...props} />);
    Simulate.click(getByTestId('btn-left'));
    Simulate.click(getByTestId('btn-right'));
    await wait(() => container.querySelectorAll('.soft'));
    const soft = Array.from(container.querySelectorAll('.soft')).map(day => day.innerHTML);
    expect(soft).toEqual(['29', '30', '31', '01', '02', '03', '04', '05', '06', '07', '08', '09', '10', '11']);
  });
});
