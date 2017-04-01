import { createStore } from 'redux';
import initialState from './initial-state';
import actionTypes from './action-types';

import * as actions from './reducers';

const actionsMap = {
  [actionTypes.TOGGLEPLAY] : (state, action) => (actions.togglePlay(state, action)),
  [actionTypes.CHANGECURRENTSONG] : (state, action) => (actions.changeCurrentSong(state, action)),
  [actionTypes.PLAYNEXT] : (state) => (actions.playNext(state)),
  [actionTypes.PLAYPREVIOUS] : (state) => (actions.playPrevious(state)),
  [actionTypes.SETQUEUE] : (state, action) => (actions.setQueue(state, action)),
  [actionTypes.ADDTOQUEUE] : (state, action) => (actions.addToQueue(state, action)),
  [actionTypes.INSERTINTOQUEUE] : (state, action) => (actions.insertIntoQueue(state, action)),
  [actionTypes.REMOVEFROMQUEUE] : (state, action) => (actions.addToQueue(state, action)),
  [actionTypes.UPDATECURRENTTIME] : (state, action) => (actions.updateCurrentTime(state, action)),
  [actionTypes.UPDATEVOLUME] : (state, action) => (actions.updateVolume(state, action)),
}

const store = createStore((state = initialState, action) => {
  if (!actionsMap[action.type]) {
    return state;
  } else {
    return actionsMap[action.type](state, action);
  }
});

export default store;
