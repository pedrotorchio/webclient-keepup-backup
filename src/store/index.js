import Vue from 'vue';
import Vuex from "vuex";

Vue.use(Vuex);

import system from './system';
import auth from './auth';
import patients from './patients';
import routines from './routines';
import tasks from './tasks';
import tasksForms from './tasks-forms';

export default new Vuex.Store({
  modules: {
    auth,
    patients,
    routines,
    tasks,
    system,
    tasksForms
  }
});