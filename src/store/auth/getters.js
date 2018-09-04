import { localSessionKey } from './config';

export default {
  getUserSession(state, token) {
    const session = window.sessionStorage;

    return JSON.parse(session.getItem(localSessionKey));
  }
}
