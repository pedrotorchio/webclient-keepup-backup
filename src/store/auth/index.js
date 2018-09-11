import Vue from 'vue';
import { mapState } from "vuex";

import state from './state';
import actions from './actions';
import mutations from './mutations';
import getters from './getters';

export default {
  namespaced: false,
  state,
  actions,
  mutations,
  getters
};

Vue.mixin({
  computed: {
    ...mapState({
      userData: state => state.auth.user
    })
  }
});