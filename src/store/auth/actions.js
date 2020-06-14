import { api } from '@/api';

export default {
  async ["trigger-password-reset"]({ commit }, data) {
    await api.post("auth/password-change-request", data);
  },
  async ["reset-password"]({ commit }, data) {
    await api.post("auth/password-change", data);
  },
  async signup({ commit }, data) {
    return api.signup(data);
  },
  async logout({ commit }) {
    await api.get("auth/logout");
    commit('reset');
  },
  async login({ commit }, { email, password }) {
    /**
     * 1. CHECKS CREDENTIALS
     * 2. SETS USER LOCAL SESSION
     */

    commit("reset");

    const login = await api.login(email, password);


    if (login) {
      commit('setUserSession', login);
    }

    return login;
  },
  async getUserData({ getters, dispatch }) {
    const {
      hasUserData,
      getUserData
    } = getters;

    let user;

    if (!hasUserData()) {
      user = await dispatch("fetchUserData");
    } else {
      user = getUserData();
    }

    return user;
  },
  async fetchUserData({ commit }) {
    const user = await api.get("auth/user");
    commit('setUserData', user);

    return user;
  },
  async checkSession({ getters, dispatch, commit }) {
    /**
     * 1. CHECKS IF THERE'S SESSION DATA LOCALLY
     * 2. UPDATES SESSION TOKEN IN API REQUESTS
     * 3. IF LACKING, FETCHES USER DATA
     * 4. RETURNS FALSE IF ANYTHING FAILS, OTHERWISE TRUE
     */

    const {
      hasSessionData,
      hasUserData,
      getUserSession,
      getUserData
    } = getters;

    let user;

    if (hasSessionData()) {

      const token = api.getTokenData();
      const sessn = getUserSession();

      if (sessn.hash !== token.hash) {
        api.setAuthorizationToken(sessn);
      }

      user = await dispatch('getUserData');

    }

    return Boolean(user);
  }
}