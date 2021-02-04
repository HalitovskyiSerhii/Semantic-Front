import * as queryString from 'query-string';

const apiHost = process.env.REACT_APP_API_HOST;
const protocol = process.env.REACT_APP_USE_SSL !== '' ? 'https' : 'http';

class ResponseWrapper {
  #json;

  #delegate;

  constructor(fetchResponse) {
    this.#delegate = fetchResponse;
  }

  get ok() {
    return this.#delegate ? this.#delegate.ok : false;
  }

  async setDelegate(value) {
    try {
      this.#json = await value.json();
    } catch (e) {
      //
    }
    this.#delegate = value;
  }

  async json() {
    return this.#delegate ? this.#json : undefined;
  }
}

function getFetchUrl(args) {
  return `${protocol}://${apiHost}${args.endpoint}${args.query ? `?${queryString.stringify(args.query)}` : ''}`;
}

function getFetchArgs(args) {
  let credentials = '';
  const headers = {};
  headers['Access-Control-Allow-Origin'] = apiHost;
  if (!args.attachment) {
    headers['Content-Type'] = 'application/json';
    headers.Accept = 'application/json';
  }
  const token = localStorage.getItem('access_token');
  if (token && !args.skipAuthorization) {
    headers.Authorization = `Bearer ${token}`;
    credentials = 'include';
  }
  let body;
  if (args.attachment) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support attachments.');
    }
    const formData = new FormData();
    formData.append('image', args.attachment);
    body = formData;
  } else if (args.request) {
    if (args.type === 'GET') {
      throw new Error('GET request does not support request body.');
    }
    body = JSON.stringify(args.request);
  }
  return {
    method: args.type,
    headers,
    ...(credentials !== '' ? { credentials } : {}),
    signal: args.ct,
    ...(args.type === 'GET' ? {} : { body })
  };
}

export async function throwIfResponseFailed(res) {
  if (!res.ok) {
    let parsedException = 'Something went wrong with request!';
    try {
      parsedException = await res.json();
    } catch (err) {
      //
    }
    // eslint-disable-next-line no-console
    console.error(parsedException);
  }
}

export default async function callWebApi(args) {
  const wrapped = new ResponseWrapper();
  let res;
  try {
    const url = getFetchUrl(args);
    const fetchArgs = getFetchArgs(args);

    // eslint-disable-next-line no-console
    console.log(`${url}`);
    // eslint-disable-next-line no-console
    console.log(fetchArgs);

    res = await fetch(url, fetchArgs);
  } catch (err) {
    // eslint-disable-next-line no-console
    console.error(err);
  } finally {
    await wrapped.setDelegate(res);
  }

  await throwIfResponseFailed(wrapped);
  return wrapped;
}
