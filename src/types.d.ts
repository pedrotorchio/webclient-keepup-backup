import Vue from "vue";
declare module 'vue-property-decorator' {
  interface Vue {
    setGlobalLoading(s: boolean): void;
  }
}