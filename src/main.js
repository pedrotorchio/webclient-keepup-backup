import '@babel/polyfill'
// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'

import { api } from '@/api';
api.setBaseUrl('http://api.keepup.com.br/api');

import "@/plugins/vuetify";
import '@/plugins/Mixins';
import '@/plugins/Directives';

import App from "./App";
import router from "./router";
import store from "./store";

Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  name: 'Root',
  el: '#app',
  router,
  store,
  components: { App },
  template: '<App/>'
})
