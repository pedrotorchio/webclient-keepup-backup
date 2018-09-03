import { api } from '@/api';

export default {
  async signup({}, data) {
    return api.signup(data);
  },
  async login({ commit }, { email, password }) {
    const login = await api.login(email, password)
    console.log(login);
    commit("setAccessTokenData", login);

    return true;
  }
}