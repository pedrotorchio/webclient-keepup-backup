<script>

import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';

import TasksRoute from '@/router/mixins/TasksRoute';
import RoutineModel from '@/components/routines/RoutineModel';
import Stats from '@/components/routines/Stats.mixin';
import Visualization from './Visualization.mixin';
import Task from '@/components/tasks/Task';

export default {
  name: 'Visualization',
  extends: Route,
  mixins: [ TasksRoute, Stats, Visualization ],
  components: { Task },
  data: () => ({
    hasLoaded: false,
    hasMounted: false
  }),
  methods: {    
    tasksLoaded() {
      this.hasLoaded = true;
      if (this.hasMounted)
        this.createVisualization();
    },
  },
  mounted() {
    this.hasMounted = true;
    if (this.hasLoaded)
      this.createVisualization();
  }
  
}
</script>
<template lang="pug" src="./template.pug"></template>
<style lang="stylus" src="./styles.styl" scoped></style>

