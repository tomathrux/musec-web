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

export function updateCurrentTime(seconds) {
  return {
    type : actionTypes.UPDATECURRENTTIME,
    payload : seconds,
  }
}

export function updateVolume(vol) {
  return {
    type : actionTypes.UPDATEVOLUME,
    payload : vol,
  }
}
