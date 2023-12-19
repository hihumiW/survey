const fetchBaseQuery = () => (url, config) => {
  const { headers = new Headers(), ...restConfig } = config;
  if (!headers.has("Content-Type")) {
    headers.append("Content-Type", "application/json");
  }
  const fetchUrl = import.meta.env.VITE_REQUEST_BASE_URL + url;

  return fetch(fetchUrl, {
    headers,
    ...restConfig,
  }).then((resp) =>
    resp.json().then((resp) => {
      if (resp.success || resp.code === 200) {
        if (import.meta.env.VITE_PROJECT_TYPE === "ethics") {
          return resp?.data?.data;
        }
        return resp?.data;
      } else {
        throw Error(resp.errMsg);
      }
    })
  );
};

export default fetchBaseQuery;
