<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import PatientForm from '@/components/patients/Form';
import { createPatient, updatePatient } from './procedures';
import { debounce } from 'debounce';
window.debounce = debounce;
export default {
  name: 'PatientsPage',
  props: {
    patientId: {
      type: Number | Boolean,
      default: false
    }
  },
  methods: {
    async submitProcedure(data) {
      
      let patient;

      if (this.patient) {
        data.id = this.patient.id;
        patient = await updatePatient.bind(this)(data);
        
      } else {

        patient = await createPatient.bind(this)(data);
        this.$router.push({
          name: 'Patients',
          params: {
            patientId: patient.id
          }
        });

      }

      return patient;
    },
    submit: debounce(function(data) {
      this.submitProcedure(data);
    }, 1000),
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
  }
}
</script>
<template lang="pug" src='./template.pug'></template>
<style lang="stylus" src='./styles.styl'></style>