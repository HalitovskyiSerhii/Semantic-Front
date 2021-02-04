import * as extractorRepository from 'src/services/extractorRepository';
import { SEND_TEXT, INIT_LOADING } from './actionTypes';

const sendText = (keys, wiki) => async dispatch => dispatch({
  type: SEND_TEXT,
  keys,
  wiki
});
const initLoading = () => async dispatch => dispatch({
  type: INIT_LOADING
});

export const send = (text, words, top) => async (dispatch, getRootState) => {
  await initLoading()(dispatch, getRootState);
  const resp = await extractorRepository.analyze(text, words, top);
  await sendText(resp.key_phrases, resp.wikipedia)(dispatch, getRootState);
};
