export function responseInterceptor(response) {
  this.previousResponse = response;

  const { data } = response;

  return data;
}

export function responseErrorInterceptor(answer) {
  
  let message = 'Undefined Error';
  
  if (!answer.response) {
    if (answer.message) {
      message = answer.message;
    }

    throw "Interceptor: " + message;
  }
  
  let {
    response: {
      status, statusText, data
    }
  } = answer;

  throw {
    status,
    statusText,
    data
  };
}