<script>
import Patient from '@/views/dashboard/patients/mixins/Patient.mixin';
import Route from '@/views/Route';

export default {
  extends: Route,
  name: 'Routines',
}
</script>

<template lang="pug">
  div
    router-view
</template>
