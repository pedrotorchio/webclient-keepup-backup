import { localSessionKey } from "./config";
import initial from './state';
import { api } from "@/api";

function setUserSession(state, login) {
  
  const session = window.sessionStorage;
  let data = null;

  if (login != false) {
    data = JSON.stringify(login);

  }

  session.setItem(localSessionKey, data);

  api.setAuthorizationToken(login);

}
function setUserData(state, { id, email, name, created_at, updated_at }) {
  state.user.id = id;
  state.user.email = email;
  state.user.name = name;
  state.user.created = created_at;
  state.user.updated = updated_at;
}
function reset(state) {
  

  const initialState = initial();

  Object.keys(initialState).forEach(key => {
    state[key] = initialState[key]
  });
  
  setUserSession(state, false);
}

export default {
  setUserData,
  setUserSession,
  reset
};