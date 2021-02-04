import { SET_WORDS } from './actionTypes';
import { top } from '../../helpers/esHelper';

const setWords = words => async dispatch => dispatch({
  type: SET_WORDS,
  words
});

export const getTop = nTop => async (dispatch, getRootState) => {
  const resp = await top(nTop);
  // console.log(resp);
  const words = resp.aggregations.frequent_tags.buckets.slice(0, nTop);
  await setWords(words)(dispatch, getRootState);
};
