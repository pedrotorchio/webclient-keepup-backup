import HookLogger from './HookLogger';

export default {
  install(Vue, options) {
    Vue.mixin(HookLogger);
  }
}