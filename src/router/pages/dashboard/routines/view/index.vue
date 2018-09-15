<script>
import Routine from '@/router/pages/dashboard/routines/mixins/Routine.mixin';
import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';
import { timescale } from '@/visualization/tasks';

export default {
  name: 'Visualization',
  extends: Route,
  mixins: [ Routine ],
  data: () => ({
    tasks: []
  }),
  methods: {
    ...mapActions([
      'fetchRoutineTasks'
    ]),
    
    async createVisualization(tasks) {
      
      const range = [0, this.$el.clientWidth];
      console.log(timescale(tasks, range));
    },

    watchRoutine(routine) {
      if (!this.$el) 
        return;

      this.fetchRoutineTasks(routine.id)
        .then(this.createVisualization);
    },
    onMounted() {
      if (!this.routine)
        return;
        
      this.fetchRoutineTasks(routine.id)
        .then(this.createVisualization);
    }
  },
  mounted() {
    this.onMounted();
  }
}
</script>
<template lang="pug" src="./template.pug"></template>
<style lang="stylus" src="./styles.styl" scoped></style>

