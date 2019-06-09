import Vue from 'vue';
import HookLogger from './HookLogger';
import VueConstants from 'vue-constants';
import RootClass from './RootClass';
import CreatedData from './CreatedData';
import SetLoading from './SetLoading';
import SetMessage from './SetMessage';

Vue.use(VueConstants);
Vue.use({
  install(Vue, options) {
    // Vue.mixin(HookLogger);
    Vue.mixin(RootClass);
    Vue.mixin(CreatedData);
    Vue.mixin(SetLoading);
    Vue.mixin(SetMessage);
  }
});