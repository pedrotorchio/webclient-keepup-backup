<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import PatientForm from '@/components/patients/Form';
import { createPatient, updatePatient } from './procedures';

export default {
  name: 'PatientsPage',
  components: {
    List,
    PatientForm
  },
  props: {
    patientId: {
      type: Number | Boolean,
      default: false
    }
  },
  computed: {
    ...mapState({
      patients: state => state.patients.patients
    }),
    patient() {
      let patient = false;
      
      if (this.patientId) {
        patient = this.patients.find(patient => patient.id == this.patientId)
      }

      return patient || false;
    },
    isList() {
      return !Boolean(this.patientId);
    },
  },
  methods: {
    async submitProcedure(data) {
      let patient;

      if (this.patient) {
        patient = await updatePatient.bind(this)(data);
      
      } else {

      }

      return patient;
    },
    onUserFetched() {
      this.$store.dispatch('fetchAllPatients');
    },
    submit(data) {
      this.submitProcedure(data)
          .then(login => this.$router.push({ name: 'Patients' }))
          .catch(login => null);
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