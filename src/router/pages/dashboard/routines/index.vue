<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
export default {
  mixins: [ Patient ],
  data: () => ({
    routines: []
  }),
  created() {
    this.$store.dispatch('fetchPatientRoutines')
        
  }
}
</script>

<template lang="pug">
  div {{ routines }}
</template>
