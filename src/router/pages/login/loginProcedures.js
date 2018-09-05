export async function loginProcedure(data) {
  return this.$store.dispatch('login', {
    email: data.email,
    password: data.password
  });
};

export function failedLogin({ status, data: { message } }) {
  switch (status) {
    case 500:
      console.error(status, message);
      break;
    case 400:
      console.error(JSON.parse(message));
      break;
  }
};