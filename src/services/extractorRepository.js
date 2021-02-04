import callWebApi from '../helpers/webApiHelper';

export const analyze = async (text, words, top) => {
  const response = await callWebApi({
    endpoint: '/api/v1/analyze',
    type: 'POST',
    query: { words, top },
    request: { text },
    skipAuthorization: true
  });
  return response.json();
};
