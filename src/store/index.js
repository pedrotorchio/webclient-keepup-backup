import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);


import auth from './auth';
import patients from './patients';

export default new Vuex.Store({
  modules: {
    auth,
    patients
  }
});