import Vue from 'vue';
import HookLogger from './HookLogger';
import RootClass from './RootClass';
import CreatedData from './CreatedData';
import SetLoading from './SetLoading';

Vue.use({
  install(Vue, options) {
    // Vue.mixin(HookLogger);
    Vue.mixin(RootClass);
    Vue.mixin(CreatedData);
    Vue.mixin(SetLoading);
  }
});