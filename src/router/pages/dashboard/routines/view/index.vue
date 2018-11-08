<script>

import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';
import { timescale } from '@/visualization/tasks';

import TasksRoute from '@/router/mixins/TasksRoute';
import RoutineModel from '@/components/routines/RoutineModel';
import Stats from '@/components/routines/Stats.mixin';

import Task from '@/components/tasks/Task';

export default {
  name: 'Visualization',
  extends: Route,
  mixins: [ TasksRoute, Stats ],
  components: { Task },
  methods: {    
    tasksLoaded() {
      this.createVisualization();
    },
    async createVisualization() {
      
      // const range = [0, this.$el.clientWidth];
      // console.log(timescale(tasks, range));
    }
  }
}
</script>
<template lang="pug" src="./template.pug"></template>
<style lang="stylus" src="./styles.styl" scoped></style>

