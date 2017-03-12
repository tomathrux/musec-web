import { createStore } from 'redux';
import initialState from './initial-state';
import actionTypes from './action-types';

import * as test from './reducers';

const actionsMap = {
  [actionTypes.TOGGLEPLAY] : (state, action) => (test.togglePlay(state)),
}

const store = createStore((state = initialState, action) => {
  if (!actionsMap[action.type]) {
    return state;
  } else {
    return actionsMap[action.type];
  }
});

export default store;
