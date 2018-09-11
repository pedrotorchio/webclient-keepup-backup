<script>
import { mapState } from 'vuex';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  name: 'Patients',
  data: () => ({
    rootActions: [
      { tip: 'Lista de Pacientes', to: '/pacientes', color: 'info', icon: 'list' },
      { tip: 'Novo Paciente', to: '/pacientes/novo', color: 'primary', icon: 'add' },
      { tip: 'Pacientes Arquivados', to: '/pacientes/arquivo', color: 'warning', icon: 'inbox' },
    ],
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
<template lang="pug">
div
  router-view(
    :actions.sync="viewActions"
  )
</template>
<style lang="stylus" scoped>
.Patients
  .v-list  
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
  .v-list-tile
    padding-left: 0;
    padding-right: 0;

</style>