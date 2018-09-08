<script>
import { mapState } from 'vuex';
import { createPatient, updatePatient } from './procedures';
import { debounce } from 'debounce';
import PatientForm from '@/components/patients/Form';

export default {
  name: 'Form',
  components: { PatientForm },
  props: {
    patientId: {
      type: Number | Boolean,
      default: false
    }
  },
  methods: {
    submit: debounce(function(data) {
      this.submitProcedure(data);
    }, 1000),
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
  },
  computed: {
    ...mapState({
      patients: state => state.patients.patients,
    }),
    patient() {
      let patient = false;
      
      if (this.patientId !== 'novo') {
        patient = this.patients.find(patient => patient.id == this.patientId)
      }

      return patient || false;
    },
  },
}
</script>

<template lang="pug">
  patient-form(
    :patient='patient'
    @change='submit'
  )
 
</template>