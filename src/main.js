import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
Vue.config.productionTip = false

import { api } from '@/api';
api.setBaseUrl(process.env.ROOT_API);

import "@/plugins/vuetify";
import '@/plugins/Mixins';
import '@/plugins/Directives';
import '@/plugins/Components';

import vuetify from './plugins/vuetify';
import router from "./router";
import store from "./store";


import App from "./App";
/* eslint-disable no-new */
new Vue({
  name: 'Root',
  router,
  store,
  components: { App },
  vuetify,
  template: '<App/>'
}).$mount('#app');
