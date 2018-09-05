export async function failedSignup({ status, data: { message } }) {
  switch (status) {
    case 500:
      console.error(status, message);
      break;
    case 400:
      console.error(JSON.parse(message));
      break;
  }
}
export async function signupProcedure(data) {
  await this.$store.dispatch('signup', data)

  return true;
}