/**
 * Created by t on 25/02/17.
 */
export function togglePlay(state, action) {
  if (state.currentSong.id.videoId == action.payload.id.videoId) {
    return { ...state, playing : !state.playing };
  } else {
    if (state.playing) {
      return { ...state, queuePosition : state.queue.indexOf(action.payload), currentSong : action.payload };
    } else {
      return { ...state, queuePosition : state.queue.indexOf(action.payload), currentSong : action.payload, playing : true };
    }
  }
}

export function changeCurrentSong(state, action) {
  return { ...state, currentSong : action.payload };
}

export function setQueue(state, action) {
  return { ...state, queue : action.payload }
}

export function addToQueue(state, action) {
  let queue = state.queue;
  if (action.payload.constructor === Array) {
  	return { ...state, queue : queue.concat(action.payload) };
  } else {
    queue.push(action.payload);
  	return { ...state, queue : queue};
  }
}

export function insertIntoQueue(state, action) {
  let queue = state.queue;
  if (action.payload.constructor === Array) {
    queue.splice(state.queuePosition+1, 0, ...action.payload);
  } else {
    queue.splice(state.queuePosition+1, 0, action.payload);
  }
  return { ...state, queue : queue };
}

export function removeFromQueue(state, action) {
 	let queue = Object.assign({}, state.queue);
 	if (action.payload.constructor === Array) {
 		let array = action.payload.filter((item) => (
 			array.indexOf(item) === -1
 		));
 		return { ...state, queue : queue };
 	}
}

export function playNext(state) {
  if (state.queuePosition == state.queue.length-1) {
    return state;
  }
  return { ...state, queuePosition : state.queuePosition+1, currentSong : state.queue[state.queuePosition+1], currentTime : 0 }
}

export function playPrevious(state) {
  if (state.queuePosition == 0 || state.currentTime > 3) {
    return { ...state, currentTime : 0 };
  }
  return { ...state, queuePosition : state.queuePosition-1, currentSong : state.queue[state.queuePosition-1] }
}

export function updateCurrentTime(state, action) {
  return { ...state, currentTime : action.payload };
}

export function updateVolume(state, action) {
  return { ...state, volume : action.payload };
}
