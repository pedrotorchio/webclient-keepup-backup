<script>
import Page from '../Page';
export default {
  name: 'DashboardPage',
  extends: Page,
  methods: {
    onUserFetched() {
      this.$store.dispatch('fetchAllPatients')
              .then(data => console.dir(data));
    }
  }
}
</script>
<template lang="pug" src='./template.pug'></template>
<template lang="pug" src='./styles.styl'></template>
