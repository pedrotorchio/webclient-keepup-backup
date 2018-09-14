<script>
import Routine from '@/router/pages/dashboard/routines/mixins/Routine.mixin';
import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';
import { timeExtent } from '@/visualization';

export default {
  extends: Route,
  mixins: [ Routine ],
  data: () => ({
    tasks: []
  }),
  methods: {
    ...mapActions([
      'fetchRoutineTasks'
    ]),
    watchRoutine(routine) {
      this.fetchRoutineTasks(routine.id)
          .then(this.createVisualization);
    },
    async createVisualization(tasks) {
      console.log(timeExtent(tasks));
    }
  }
}
</script>
<template lang="pug" src="./template.pug"></template>
