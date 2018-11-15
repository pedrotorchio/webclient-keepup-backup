import Vue from 'vue';
import ClickOutside from 'vue-click-outside';

Vue.use({
  install(Vue, options) {
    Vue.directive('out-click', ClickOutside);
  }
});