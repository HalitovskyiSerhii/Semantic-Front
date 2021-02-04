import { SET_WORDS } from './actionTypes';

export default (state = { words: [] }, action) => {
  switch (action.type) {
    case SET_WORDS:
      return {
        ...state,
        words: action.words
      };
    default:
      return state;
  }
};
