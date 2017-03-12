/**
 * Created by t on 25/02/17.
 */
export function togglePlay(state) {
  return { ...state, playing : !state.playing };
}
