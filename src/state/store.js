import { createStore } from 'redux';
import initialState from './initial-state';
import actionTypes from './action-types';

import * as test from './reducers';

const actionsMap = {
  [actionTypes.COUNT] : (state, action) => (test.count(state)),
}

const store = createStore((state = initialState, action) => {
  switch(action.type) {
    case actionTypes.COUNT:
      return actionsMap[actionTypes.COUNT](state);
    default:
      return state;
  }
});

export default store;
