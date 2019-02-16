import { error500 } from './commonErrors';

export async function failedSignup({ status, data: { message } }) {
  switch (status) {
    case 500:
      error500.bind(this)();
      
      break;
    case 400:
      
      break;
  }

  throw arguments[0];
}
export async function signupProcedure(data) {
  await this.$store.dispatch('signup', data)

  return true;
}