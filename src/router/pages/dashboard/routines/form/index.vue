<script>

import Route from '@/router/pages/Route';
import FormView from '@/components/generic/form/FormView.mixin';
import RoutineRoute from '@/router/mixins/RoutineRoute';
import RoutineForm from '@/components/routines/Form';
import { createRoutine, updateRoutine } from './procedures';

export default {
  extends: Route,
  components: { RoutineForm },
  mixins: [ RoutineRoute, FormView ],
  name: 'Routine-Form', 
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
    routineLoaded() {
      const { patient_id: patientId } = this.routine;

      this.rootActions.push({
        tip: 'Outras Rotinas',
        to: {
          name: 'RoutinesList',
          params: {
            patientId
          }
        }, 
        color: 'info', 
        icon: 'list' 
      });
    }
  },
  created() {
    this.rootActions.push({ to: {
        name: 'TaskView',
        params: {
          routineId: this.routineId
        }
      },
      color: 'secondary', icon: 'event', tip: 'Ver Atividades'
    })
  }  
}
</script>

<template lang="pug">
div
  routine-form(
    :model="routine"
    @change='submit'
  )
</template>
