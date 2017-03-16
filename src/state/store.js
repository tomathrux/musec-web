import { createStore } from 'redux';
import initialState from './initial-state';
import actionTypes from './action-types';

import * as actions from './reducers';

const actionsMap = {
  [actionTypes.TOGGLEPLAY] : (state) => (actions.togglePlay(state)),
  [actionTypes.CHANGECURRENTSONG] : (state, action) => (actions.changeCurrentSong(state, action)),
  [actionTypes.UPDATECURRENTTIME] : (state, action) => (actions.updateCurrentTime(state, action)),
}

const store = createStore((state = initialState, action) => {
  if (!actionsMap[action.type]) {
    return state;
  } else {
    return actionsMap[action.type](state, action);
  }
});

export default store;
