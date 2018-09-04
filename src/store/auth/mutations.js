export default {
  setUserData(state, { id, email, name, created_at, updated_at }) {
    state.user.id = id;
    state.user.email = email;
    state.user.name = name;
    state.user.created = created_at;
    state.user.updated = updated_at;
  },
  setUserSession(state, login) {
    const session = window.sessionStorage;
    
    session.setItem("user", JSON.stringify(login));
  }
};