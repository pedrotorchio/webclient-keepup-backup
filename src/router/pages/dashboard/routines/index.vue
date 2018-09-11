<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  name: 'Routines',
  data: () => ({
    
  }),
  watch: {
    pacientId: {
      immediate: true,
      handler(id) {
        this.rootActions.push({ 
          tip: 'Lista de Rotinas', 
          to: { name: 'RoutinesList', params: { pacientId: id } }, 
          color: 'info', 
          icon: 'list' 
        });
        this.rootActions.push({ 
          tip: 'Adicionar Rotina', 
          to: { name: 'RoutinesNew', params: { pacientId: id } },
          color: 'primary', 
          icon: 'add' 
        });
      }
    }
  }
}
</script>

<template lang="pug">
  div
    router-view(
      :actions.sync="viewActions"
    )
</template>
