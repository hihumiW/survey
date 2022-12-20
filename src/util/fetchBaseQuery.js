const fetchBaseQuery = () => (url, config) => {
  const { headers = new Headers(), ...restConfig } = config;
  if (!headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }
  return fetch(url, {
    headers,
    ...restConfig,
  }).then((resp) =>
    resp.json().then((resp) => {
      if (resp.success) {
        return resp?.data;
      } else {
        throw Error(resp.errMsg);
      }
    })
  );
};

export default fetchBaseQuery;
