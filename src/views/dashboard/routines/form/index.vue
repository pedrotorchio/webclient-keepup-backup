<script>

import Route from '@/views/Route';
import FormView from '@/components/generic/form/FormView.mixin';
import PatientRoute from '@/router/mixins/PatientRoute';
import RoutineRoute from '@/router/mixins/RoutineRoute';
import RoutineForm from '@/components/routines/Form';
import { createRoutine, updateRoutine } from './procedures';

export default {
  extends: Route,
  components: { RoutineForm },
  mixins: [ PatientRoute, RoutineRoute, FormView ],
  name: 'Routine-Form',
  methods: {
    ////// submit@FormView is called whenever form emits @change
    ///// submit calls submitProcedure
    isNewForm() {
      return this.$route.name === 'RoutineNew'
    },
    async submitProcedure(data) {


      let routine;

      if (this.isNewForm()) {

        routine = await createRoutine.bind(this)({ patientId: this.patientId, data});
        this.$router.push({
          name: 'RoutineEdit',
          params: {
            routineId: routine.id
          }
        });

      } else {

        data.id = this.routine.id;
        routine = await updateRoutine.bind(this)(data);

      }

      return routine;
    },
    onRoutineLoaded() {
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

    },
    onPatientLoaded() {
      const { id: patientId } = this.patient;

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

    if (!this.isNewForm()) {
      this.rootActions.push({
        to: {
          name: 'TasksView',
          params: {
            routineId: this.routineId
          }
        },
        color: 'secondary', icon: 'event', tip: 'Ver Atividades'
      });
    }
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
