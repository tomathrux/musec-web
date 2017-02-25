/**
 * Created by t on 25/02/17.
 */
export function count(state) {
  return { ...state, count: (state.count) + 1 };
}
