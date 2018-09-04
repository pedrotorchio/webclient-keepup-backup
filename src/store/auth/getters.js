export default {
  getUserSession(state, token) {
    const session = window.sessionStorage;

    return session.getItem("user");
  }
}
