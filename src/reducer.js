import { PLAY, GAMEOVER } from './actions';

export const initialState = {
  isPlaying: false,
  score: 0
};

export const reducer = (state = initialState, action) => {
  switch (action.type) {
    case PLAY:
      return { ...state, isPlaying: true };
    case GAMEOVER:
      return { ...state, isPlaying: false, score: action.score };
    default:
      return state;
  }
};
