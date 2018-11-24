<script>
import { mapState } from 'vuex';
import { createPatient, updatePatient } from './procedures';
import FormView from '@/components/generic/form/FormView.mixin';
import PatientForm from '@/components/patients/Form';
import Route from '@/router/pages/Route';
import PatientRoute from '@/router/mixins/PatientRoute';

export default {
  extends: Route,
  mixins: [ PatientRoute, FormView ],
  name: 'Patient-Form',
  components: { PatientForm },
  data: () => ({
    rootActions: [
      { tip: 'Lista de Pacientes', to: { name: 'PatientsList' }, color: 'secondary', icon: 'list' },
    ],
  }),
  methods: {
    async submitProcedure(data) {
      
      let patient;

      if (this.patient) {
        data.id = this.patient.id;
        patient = await updatePatient.bind(this)(data);
        
      } else {

        patient = await createPatient.bind(this)(data);

        this.$router.push({
          name: 'RoutinesList',
          params: {
            patientId: patient.id
          }
        });

      }

      return patient;
    },
    onPatientLoaded() {
      const name = `${this.patient.first_name} ${this.patient.last_name}`;
      const tip = `Rotina de ${name}`;
      
      this.rootActions.push({
        tip: tip, 
        to: {
          name: 'RoutinesList',
          params: {
            patientId: this.patientId
          }
        }, 
        color: 'info', 
        icon: 'event' 
      });
    }  
  },
  
    
}
</script>

<template lang="pug">
  patient-form(
    :model='patient'
    @change='submit'
  )
 
</template>