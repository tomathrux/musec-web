import actionTypes from '../action-types';

export function togglePlay() {
  return {
    type: actionTypes.TOGGLEPLAY,
  };
}

export function changeCurrentSong(song) {
  return {
    type : actionTypes.CHANGECURRENTSONG,
    payload : song,
  }
}
