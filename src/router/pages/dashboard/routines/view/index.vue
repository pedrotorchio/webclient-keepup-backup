<script>

import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';

import TasksRoute from '@/router/mixins/TasksRoute';
import TasksFormView from './TasksForm.mixin';
import RoutineModel from '@/components/routines/RoutineModel';
import Stats from '@/components/routines/Stats.mixin';
import Visualization from './Visualization.mixin';

import FormToggle from './FormToggle';
import xAxis from './xAxis';
import yAxis from './yAxis';
import Rows from './Rows';
import Columns from './Columns';
import Tasks from './Tasks';

export default {
  name: 'Visualization',
  extends: Route,
  mixins: [ TasksRoute, TasksFormView, Stats, Visualization ],
  components: { FormToggle, xAxis, yAxis, Rows, Columns, Tasks },

  watch: {
    selectedElements(newElements, oldElements) {

      let state = false
      let elems = newElements;

      const len = newElements.length;
      
      if (len === 1)
        state = true;

      else if (len === 0)
        elems = oldElements;

      elems.map ( el => el.setEditable(state) );
    },
  },
  methods: {
    onTaskChange(task) {
      const i = this.tasks.findIndex( t => t.id === task.id);
      
      Object.entries( task ).forEach( ([key, value]) => {
        this.tasks[i][key] = value;
      }); 
    }
  },
  created() {
    this.rootActions.push({
      tip: 'Informações de Rotina',
      to: {
        name: 'RoutineEdit',
        params: {
          routineId: this.routineId
        }
      },
      color: 'secondary',
      icon: 'edit'
    });
    this.rootActions.push({
      tip: 'Novo Formulário de Atividades',
      to: {
        name: 'FormNew',
        params: {
          routineId: this.routineId
        }
      },
      color: 'primary',
      icon: 'add'
    });
  }
}
</script>
<template lang="pug" src="./template2.pug"></template>
<style lang="stylus" src="./styles2.styl" scoped></style>


