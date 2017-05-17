import { createStore, applyMiddleware, compose } from 'redux';
/* eslint-disable import/no-extraneous-dependencies */
import reduxImmutableStateInvariant from 'redux-immutable-state-invariant';
/* eslint-enable import/no-extraneous-dependencies */
import axios from 'axios';
import thunk from 'redux-thunk';
import DevTools from '../components/DevTools';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  return createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk.withExtraArgument({ axios }), reduxImmutableStateInvariant()),
      DevTools.instrument(),
    ),
  );
}
