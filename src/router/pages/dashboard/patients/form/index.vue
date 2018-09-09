<script>
import { mapState } from 'vuex';
import { createPatient, updatePatient } from './procedures';
import { debounce } from 'debounce';
import PatientForm from '@/components/patients/Form';
import Route from '@/router/pages/Route';
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';

export default {
  extends: Route,
  mixins: [ Patient ],
  name: 'Form',
  components: { PatientForm },
  props: {
    actions: {
      type: Array,
      default: []
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
          name: 'Patient',
          params: {
            patientId: patient.id
          }
        });

      }

      return patient;
    },
  },
  watch: {
    patient: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data) {
          let name = `${data.first_name} ${data.last_name}`;
          const tip = `Rotina de ${name}`;
          
          this.$emit('update:actions', [
            { tip: tip, to: '/rotinas', color: 'info', icon: 'event' },
          ])
        }
      }
    }
  },
  beforeDestroy() {
    this.$emit('update:actions', []);
  }
}
</script>

<template lang="pug">
  patient-form(
    :patient='patient'
    @change='submit'
  )
 
</template>