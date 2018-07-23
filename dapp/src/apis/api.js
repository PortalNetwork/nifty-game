
const URI = 'http://localhost:3000/v1';

const headers = {
  Accept: 'application/json',
  'Content-Type': 'application/json'
};

const route = (path, uri= URI) => (`${uri}/${path}`);

const fetchPOST = async (route, payload) => {
  try {
    const res = await fetch(route, {
      method: 'POST',
      headers,
      body: JSON.stringify(payload)
    });

    const result = await res.json();

    if (res.status !== 200) {
      throw Error(result.message);
    }

    return result;
  } catch (error) {
    console.log('POST API ERROR: ', route, error);
    return error;
  }
}

const fetchGET = async (route, queryParams) => {
  try {
    let query = null;
    if (queryParams !== undefined && queryParams !== null) {
      query = Object.keys(queryParams)
      .map((key) => (`${key}=${queryParams[key]}`))
      .join('&');
    }

    const uri = (query === null) ? route : `${route}?${query}`;
    const res = await fetch(uri);
    const result = await res.json();
    
    if (res.status !== 200) {
      throw Error(result.message);
    }

    return result;
  } catch (error) {
    console.log('GET API ERROR: ', route, error);
    return error;
  }
}

export const getHealthResult = (payload) => fetchGET(route('health'), payload);
