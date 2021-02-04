import { SEND_TEXT, INIT_LOADING } from './actionTypes';

export default (state = { keys: [], wiki: [], isLoading: false }, action) => {
  switch (action.type) {
    case SEND_TEXT:
      return {
        ...state,
        keyphrases: action.keys,
        wiki: action.wiki,
        isLoading: false
      };
    case INIT_LOADING:
      return {
        ...state,
        isLoading: true
      };
    default:
      return state;
  }
};
