import { error500 } from './commonErrors';

export async function resetProcedure(data) {

  const route = this.$router.resolve({
    name: "UpdatePassword"
  });
  const passwordChangePageUrl = new URL(route.href, window.location.origin).href;

  return this.$store.dispatch('trigger-password-reset', {
    email: data.email,
    captcha: data.captcha,
    passwordChangePageUrl
  });
};

export function failedReset({ status, data: { message } }) {
  switch (status) {
    case 500:
        error500.bind(this)();
      break;
    case 400:

      break;
  }

  throw arguments[0];
};