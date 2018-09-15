import Vue from 'vue';
import HookLogger from './HookLogger';
import RootClass from './RootClass';
import CreatedData from './CreatedData';

Vue.use({
  install(Vue, options) {
    // Vue.mixin(HookLogger);
    Vue.mixin(RootClass);
    Vue.mixin(CreatedData);
  }
});