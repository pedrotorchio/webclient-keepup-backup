<script>
import TasksFormRoute from '@/router/mixins/TasksFormRoute';
import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';
import Task from './Task';
import TasksForm from './NewTaskForm';

export default {
  extends: Route,
  components: { Task, TasksForm },
  // mixins: [ TasksFormRoute ],
  props: {
    formUid: {}
  },
  data: () => ({
    form: null,
    taskOptions: null
  }),
  methods: {
    ...mapActions({
      fetchForm: 'fetchTasksFormPublicData',
      fetchTaskOptions: 'fetchTaskOptions'
    }),
    async fetchData() {
      let fetchers = [this.fetchForm(this.formUid), this.fetchTaskOptions(this.formUid)]
      
      const [ form, taskOptions ] = await Promise.all(fetchers);

      this.form = form;
      this.taskOptions = taskOptions;
    }
  },
  computed: {
    hasTasks() {
      return this.form && this.form.tasks.length > 0;
    },
    fillerName() {
      return this.form.filler_name;
    },
    totalPunctuation() {
      return 432;
    },
    patient() {
      return this.form.routine.patient;
    }
  },
  created() {
    this.fetchData();
  }
}
</script>
<template lang="pug" src="./template.pug"></template>
<style lang="stylus" src="./styles.styl" scoped></style>

