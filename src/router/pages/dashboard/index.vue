<script>
import Page from '../Page';
import { mapState } from 'vuex';

export default {
  name: 'DashboardPage',
  extends: Page,
  computed: {
    ...mapState({
      allActions: state => state.system.actions
    })
  },
  methods: {
    logout() {
      this.$store.dispatch('logout');
      this.$router.push({
        name: 'Login'
      });
    }
  }
}
</script>
<template lang="pug" src='./template.pug'></template>
<style lang="stylus" src='./styles.styl'></style>

