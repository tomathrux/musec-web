import actionTypes from '../action-types';

export function togglePlay(song) {
  return {
    type: actionTypes.TOGGLEPLAY,
    payload : song
  };
}

export function changeCurrentSong(song) {
  return {
    type : actionTypes.CHANGECURRENTSONG,
    payload : song,
  }
}

export function playNext() {
  return {
    type : actionTypes.PLAYNEXT,
  }
}

export function playPrevious() {
  return {
    type : actionTypes.PLAYPREVIOUS,
  }
}

export function setQueue(song) {
  return {
    type : actionTypes.SETQUEUE,
    payload : song,
  }
}

export function addToQueue(song) {
  return {
    type : actionTypes.ADDTOQUEUE,
    payload : song,
  }
}

export function insertIntoQueue(song) {
  return {
    type : actionTypes.INSERTINTOQUEUE,
    payload : song,
  }
}

export function removeFromQueue(song) {
  return {
    type : actionTypes.REMOVEFROMQUEUE,
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
