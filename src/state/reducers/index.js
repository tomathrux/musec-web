/**
 * Created by t on 25/02/17.
 */
export function togglePlay(state) {
  return { ...state, playing : !state.playing };
}

export function changeCurrentSong(state, action) {
  return { ...state, currentSong : action.payload };
}

export function updateCurrentTime(state, action) {
  return { ...state, currentTime : action.payload };
}
