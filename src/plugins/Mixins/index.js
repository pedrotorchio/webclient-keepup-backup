import Vue from 'vue';
import HookLogger from './HookLogger';

Vue.use({
  install(Vue, options) {
    Vue.mixin(HookLogger);
  }
});