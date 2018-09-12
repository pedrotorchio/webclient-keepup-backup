<script>
import Route from '@/router/pages/Route';
import FormView from '@/components/generic/form/FormView.mixin';
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import RoutineForm from '@/components/routines/Form';

export default {
  extends: Route,
  components: { RoutineForm },
  mixins: [ Patient, FormView ],
  name: 'Form', 
}
</script>

<template lang="pug">
div
  routine-form
</template>
