export function responseInterceptor(response) {
  this.previousResponse = response;

  const { data } = response;

  return data;
}

export function responseErrorInterceptor({ response: { status, statusText, data } }) {
  throw {
    status,
    statusText,
    data
  };
}