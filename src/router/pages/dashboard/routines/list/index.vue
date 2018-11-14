<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import List from '@/components/routines/List';
import Route from '@/router/pages/Route';

export default {
  name: 'RoutinesList',
  extends: Route,
  mixins: [ Patient ],
  components: {
    List
  },
  data: () => ({
    routines: []
  }),
  created() {
    this.$store.dispatch('fetchPatientRoutines', this.patientId)
        .then( routines => {
          routines.forEach( routine => this.routines.push(routine) );
        });
  },
  methods: {
    
    watchPatient(patient) {
      const { id } = patient;

      this.rootActions.push({ 
        tip: 'Lista de Rotinas', 
        to: { name: 'RoutinesList', params: { patientId: id } }, 
        color: 'secondary', 
        icon: 'list' 
      });
      this.rootActions.push({ 
        tip: 'Adicionar Rotina', 
        to: { name: 'RoutinesNew', params: { patientId: id } },
        color: 'primary', 
        icon: 'add' 
      });
    },
    open(routine) {
      const { id, title } = routine;
      const name = title.split(' ').join('-');
      const patientId = this.patientId;

      this.$router.push({
        name: 'RoutineEdit',
        params: {
          patientId: patientId,
          routineId: id
        }
      });
    },
    remove(id) {
      this.$store.dispatch('deleteRoutine', id)
          .then(() => {
            const index = this.routines.findIndex(r => r.id === id);
            this.routines.splice(index, 1);
          });
    }
    
  }
}
</script>

<template lang="pug">
  div
    list(
      :array='routines'
      @action='remove'
      @open='open'
    )
</template>
