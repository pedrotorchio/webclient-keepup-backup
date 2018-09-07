import { api } from '@/api';

export default {
  async signup({ commit }, data) {
    return api.signup(data);
  },
  async login({ commit, dispatch }, { email, password }) {
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
      hasSession, 
      hasUserData,
      getUserSession

    } = getters;

    let user;
    
    if (hasSession()) {
      
      const token = api.getTokenData();
      const sessn = getUserSession();
      
      if (sessn.hash !== token.hash) {
        api.setAuthorizationToken(sessn);
      }
      
      if (!hasUserData()) {

        user = await dispatch("fetchUserData");
      }
      
    }
    
    return Boolean(user);
  }
}