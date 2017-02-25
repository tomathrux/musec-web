import { createStore } from 'redux';
import initialState from './initial-state';
import actionTypes from './action-types';

import * as test from './reducers';

const actionsMap = {
  [actionTypes.COUNT] : (state, action) => (test.count(state)),
}

const store = createStore((state = initialState, action) => {
  // TODO: Add action handlers (aka "reducers")
  switch (action.type) {
    case 'COUNT':
      return { ...state, count: (state.count) + 1 };
    default:
      return state;
  }
});

export default store;
