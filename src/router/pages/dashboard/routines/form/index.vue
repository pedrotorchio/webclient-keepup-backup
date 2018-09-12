<script>

import Route from '@/router/pages/Route';
import FormView from '@/components/generic/form/FormView.mixin';
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import Routine from '@/router/pages/dashboard/routines/mixins/Routine.mixin';
import RoutineForm from '@/components/routines/Form';
import { createRoutine, updateRoutine } from './procedures';

export default {
  extends: Route,
  components: { RoutineForm },
  mixins: [ Patient, Routine, FormView ],
  name: 'Form', 

  methods: {
    ////// submit@FormView is called whenever form emits @change
    ///// submit calls submitProcedure

    async submitProcedure(data) {

      let routine;
      
      if (this.$route.name === 'RoutinesNew') {
        
        routine = await createRoutine.bind(this)({ patientId: this.patientId, data});

      } else {
        
        data.id = this.routine.id;
        routine = await updateRoutine.bind(this)(data);

      }

      return routine;
    },
  },
  
}
</script>

<template lang="pug">
div
  routine-form(
    :model="routine"
    @change='submit'
  )
</template>
