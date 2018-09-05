<script>
import Page from './Page';
export default {
  extends: Page,
  methods: {
    onUserFetched() {
      this.$store.dispatch('fetchAllPatients')
              .then(data => console.dir(data));
    }
  }
}
</script>
<template lang="pug">
  div
</template>
