import { error500 } from './commonErrors';

export async function loginProcedure(data) {
  console.log(data);
  return this.$store.dispatch('login', {
    email: data.email,
    password: data.password
  });
};

export function failedLogin({ status, data: { message } }) {
  switch (status) {
    case 500:
        error500.bind(this)();
      break;
    case 400:

      break;
  }

  throw arguments[0];
};