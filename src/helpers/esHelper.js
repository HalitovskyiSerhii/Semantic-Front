import callWebApi from './webApiHelper';

const protocol = process.env.REACT_APP_USE_SSL !== '' ? 'https' : 'http';

export const transformParams = params => {
  // console.log(params);
  const newParams = {
    ...params,
    url: params.url.replace('https', protocol)
  };
  // console.log(newParams);
  return newParams;
};

export const top = async () => {
  const response = await callWebApi({
    endpoint: '/es/_search',
    type: 'POST',
    request: { size: 0, aggs: { frequent_tags: { terms: { field: 'key_phrases' } } } },
    skipAuthorization: true
  });
  return response.json();
};
