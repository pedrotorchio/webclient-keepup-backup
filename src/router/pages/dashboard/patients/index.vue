<script>
import { mapState } from 'vuex';

export default {
  name: 'PatientsPage',
  computed: mapState({
    patients: state => state.patients.patients,

  }),
  methods: {
    onUserFetched() {
      this.$store.dispatch('fetchAllPatients');
    },
    open(index) {
      console.log(index);
    },
    remove(index) {
      console.log(index);
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