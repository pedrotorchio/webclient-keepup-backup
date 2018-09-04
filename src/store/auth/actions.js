import { api } from '@/api';

export default {
  async signup({}, data) {
    return api.signup(data);
  },
  async login({ commit, dispatch }, { email, password }) {
    const login = await api.login(email, password);
    let user;

    if (login) {
      api.setAuthorizationToken(login);
      commit('setUserSession', login);
      
      user = await dispatch('fetchUserData');
    }

    return user;
  },
  async fetchUserData({ commit }) {
    const user = await api.get("auth/user");
    commit('setUserData', user);

    return user;
  },
  async checkSession({ getters, dispatch, commit }) {
    const { getUserSession } = getters;
    let user;
    
    if (getUserSession && getUserSession.hash) {
      api.setAuthorizationToken(getUserSession);
      user = await dispatch("fetchUserData")
                    .catch(error => {
                      commit("setUserSession", false);
                    })

      return true;
    }
    
    return false;
  }
}