<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
export default {
  mixins: [ Patient ],
  data: () => ({
    routines: []
  }),
  created() {
    this.$store.dispatch('fetchPatientRoutines', this.patientId)
        .then( routines => {
          routines.forEach( routine => this.routines.push(routine) );
        });
        
  }
}
</script>

<template lang="pug">
  div {{routines}}
</template>
