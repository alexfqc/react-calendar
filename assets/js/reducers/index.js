import { combineReducers } from 'redux';
import holidays from './holidaysReducer';

const rootReducer = combineReducers({
  holidays,
});

export default rootReducer;
