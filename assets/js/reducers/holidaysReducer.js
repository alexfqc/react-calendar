import initialState from './initialState';

export default function holidaysReducers(state = initialState.holidays, action) {
  switch (action.type) {
    case 'ADD_HOLIDAYS':
      return [
        ...state,
        action.holidays,
      ];
    case 'ERROR':
      return [{ error: 'error' }];

    default:
      return state;
  }
}
