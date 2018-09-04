import { api } from '@/api';

export default {
  async signup({}, data) {
    return api.signup(data);
  },
  async login({ commit }, { email, password }) {
    const login = await api.login(email, password);
    
    if (login) {
      commit('setUserSession', login);
      
      const user = await api.get("auth/user");
      commit('setUserData', user);
    }

    return login;
  }
}