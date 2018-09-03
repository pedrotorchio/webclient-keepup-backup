import Vue from 'vue';
import Vuex from "vuex";

import { api } from '@/api'; // usar assim


Vue.use(Vuex);

export default new Vuex.Store({
  actions: {
    async test() {
      api.setBaseUrl('http://api.keepup.com.br/api');

      let users = await api.read('users');
      api.login('pedro@torchiodev.com', '4321');
          users = await api.read("users");

    }
  }
});