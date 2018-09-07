import Vue from 'vue';
import HookLogger from './HookLogger';
import RootClass from './RootClass';

Vue.use({
  install(Vue, options) {
    // Vue.mixin(HookLogger);
    Vue.mixin(RootClass);
  }
});