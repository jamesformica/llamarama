import { PLAY, GAMEOVER, READY } from './actions'

export const initialState = {
  ready: false,
  isPlaying: false,
  score: '0'
}

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return { ...state, isPlaying: true }
    case GAMEOVER:
      return { ...state, isPlaying: false, score: action.score }
    case READY:
      return { ...state, ready: true }
    default:
      return state
  }
}
