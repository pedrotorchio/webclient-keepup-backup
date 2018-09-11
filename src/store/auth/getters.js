import { localSessionKey } from './config';

export default {
  hasSessionData: ( state, getters ) => () => {
    const { getUserSession } = getters;
    const session = getUserSession();

    return Boolean(session && session.hash);
  },
  getUserData: state => () => {
    return state.user;
  },
  getUserSession: () => () => {
    const session = window.sessionStorage;

    return JSON.parse(session.getItem(localSessionKey));
  },
  hasUserData: state => () => {
    return Boolean(state.user.id);
  },
  getUserId: ( state, getters ) => () => {
    const { getUserData } = getters;

    return getUserData().id;
  }
}
