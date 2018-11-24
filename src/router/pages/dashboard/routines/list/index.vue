<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import List from '@/components/routines/List';
import Route from '@/router/pages/Route';
import PatientRoute from '@/router/mixins/PatientRoute';

export default {
  name: 'RoutinesList',
  extends: Route,
  mixins: [ Patient, PatientRoute ],
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
    
    onPatientLoaded() {

      const { id } = this.patient;

      this.rootActions.push({ 
        tip: 'Adicionar Rotina', 
        to: { name: 'RoutineNew', params: { patientId: id } },
        color: 'primary', 
        icon: 'add' 
      });
      this.rootActions.push({ 
        tip: 'Editar Paciente', 
        to: { name: 'PatientEdit', params: { patientId: id } },
        color: 'secondary', 
        icon: 'edit' 
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
