<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import PatientForm from '@/components/patients/Form';

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
    onUserFetched() {
      this.$store.dispatch('fetchAllPatients');
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