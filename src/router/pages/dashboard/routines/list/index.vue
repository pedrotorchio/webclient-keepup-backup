<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import List from '@/components/routines/List';

export default {
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
    open(routine) {

    },
    
  }
}
</script>

<template lang="pug">
  div
    list(
      :array='routines'
      :icon='false'
      @open='open'
    )
</template>
