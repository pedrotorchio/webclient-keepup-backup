<script>
import { mapState } from 'vuex';

export default {
  name: 'PatientsPage',
  computed: {
    patients() {
      
    }
  },
  methods: {
    onUserFetched() {
      this.$store.dispatch('fetchAllPatients')
              .then(data => console.dir(data));
    }
  },
  watch: {
    userData: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data.id) {
          this.onUserFetched();
        }
      }
    }
  }
}
</script>
<template lang="pug" src='./template.pug'></template>
<style lang="stylus" src='./styles.styl'></style>