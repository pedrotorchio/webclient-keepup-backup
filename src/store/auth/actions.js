import { api } from '@/api';

export default {
  async signup({}, data) {
    return api.signup(data);
  },
  async login({ commit }, { email, password }) {
    const login = await api.login(email, password);
    
    if (login) {
      const user = await api.read("auth/user");
      commit('setUserData', user);
    }

    return login;
  }
}