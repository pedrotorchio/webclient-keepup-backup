<script>
import { mapState } from 'vuex';
import { createPatient, updatePatient } from './procedures';
import FormView from '@/components/generic/form/FormView.mixin';
import PatientForm from '@/components/patients/Form';
import Route from '@/router/pages/Route';
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';

export default {
  extends: Route,
  mixins: [ Patient, FormView ],
  name: 'Form',
  components: { PatientForm },
  methods: {
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

    watchPatient(data) {
      if (data) {
        let name = `${data.first_name} ${data.last_name}`;
        const tip = `Rotina de ${name}`;
        
        this.rootActions.push({ 
          tip: tip, 
          to: `/rotinas/paciente/${data.id}`, 
          color: 'info', 
          icon: 'event' 
        });
      }
    }
  },
  
}
</script>

<template lang="pug">
  patient-form(
    :patient='patient'
    @change='submit'
  )
 
</template>