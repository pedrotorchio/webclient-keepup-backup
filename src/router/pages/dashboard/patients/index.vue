<script>
import { mapState } from 'vuex';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  name: 'Patients',
  data: () => ({
    parentActs: [
      { tip: 'Lista de Pacientes', to: '/pacientes', color: 'info', icon: 'list' },
      { tip: 'Novo Paciente', to: '/pacientes/novo', color: 'primary', icon: 'add' },
      { tip: 'Pacientes Arquivados', to: '/pacientes/arquivo', color: 'warning', icon: 'inbox' },
    ],
    childActs: []
  }),
  computed: {
    ...mapState({
      userData: state => state.auth.user
    })
  },
  watch: {
    userData: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data.id)
          this.$store.dispatch('fetchAllPatients');
      }
    }
  },
}
</script>
<template lang="pug" src='./template.pug'></template>
<style lang="stylus" src='./styles.styl'></style>