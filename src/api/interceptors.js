export function responseInterceptor(response) {
  this.previousResponse = response;

  const { data } = response;

  return data;
}

export function responseErrorInterceptor(answer) {
  
  let status = 500;
  let statusText = 'Internal Error';
  let data = {
    error: 'undefined',
    exception: null,
    message: 'Undefined Error'
  };

  if (!answer.response) {
    if (answer.message) {
      data.message = answer.message;
    }
  } else {
    ({ status, statusText, data } = answer.response);
  }
  
  throw {
    status,
    statusText,
    data
  };
}