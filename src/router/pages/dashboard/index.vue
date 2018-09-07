<script>
import Page from '../Page';
export default {
  name: 'DashboardPage',
  extends: Page,
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
<style lang="stylus" src='./styles.styl' scoped></style>

