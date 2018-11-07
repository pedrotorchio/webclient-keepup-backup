<script>
import Patient from '@/router/pages/dashboard/patients/mixins/Patient.mixin';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  name: 'Routines',
}
</script>

<template lang="pug">
  div
    router-view
</template>
