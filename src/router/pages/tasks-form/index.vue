<script>
import TasksFormRoute from '@/router/mixins/TasksFormRoute';
import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';
import Task from './Task';
import TasksForm from './NewTaskForm';
import FormPointsView from '@/components/tasks-form/FormPointsView';
import { toInteger } from '@/visualization/utils/time';

import Animation from './Animation.mixin';

export default {
  extends: Route,
  components: { Task, TasksForm },
  // mixins: [ TasksFormRoute ],
  mixins: [ FormPointsView, Animation ],
  props: {
    formUid: {}
  },
  data: () => ({
    form: {
      tasks: [],
      routine: {
        patient: {
          first_name: null
        }
      }
    },
    taskOptions: [],
    currentTask: {
      title: '',
      time: '06:00',
      duration: 20,
      independency: 4,
      location: '',
      company: '',
      simultaneous_task: '',
      uid: null
    }
  }),
  methods: {
    ...mapActions({
      fetchForm: 'fetchTasksFormPublicData',
      fetchTaskOptions: 'fetchTaskOptions',
      createTask: 'formCreateTask',
      updateTask: 'formUpdateTask',
      deleteTask: 'formDeleteTask'
    }),
    show() {
      this.$refs.form.show();
    },
    hide() {
      this.$refs.form.hide();
      
      this.resetDataValues( data => data.currentTask );
      
    },
    open(task) {

      // this.currentTask.title = task.title;
      // this.currentTask.time = task.time;
      // this.currentTask.duration = task.duration;
      // this.currentTask.independency = task.independency;
      // this.currentTask.location = task.location;
      // this.currentTask.company = task.company;
      // this.currentTask.simultaneous_task = task.simultaneous_task;
      let copy = { ...task };
      Object.assign(this.currentTask, copy);

      this.show();
    },
    async fetchData() {
      this.setGlobalLoading(true)
      let fetchers = [this.fetchForm(this.formUid), this.fetchTaskOptions(this.formUid)]
      
      const [ form, taskOptions ] = await Promise.all(fetchers);

      this.form = form;
      this.taskOptions = taskOptions;
      this.setGlobalLoading(false)
    },
    async remove(taskUid) {
      
      this.form.tasks = await this.deleteTask({
        taskUid,
        formUid: this.formUid
      })
    },
    async submit(data) {
      
      const taskUid = data.uid;
      const formUid = this.formUid;

      data = {
        data,
        formUid,
      }

      if (!taskUid) {
        this.form.tasks = await this.createTask(data);
      } else {
        data.taskUid = taskUid;
        this.form.tasks = await this.updateTask(data);
      }

      this.hide();
    }
  },
  computed: {
    sortedTasks() {
      return [...this.form.tasks]
        .sort((a, b) => toInteger(a.time, 'h') - toInteger(b.time, 'h'));
      
    },
    hasTasks() {
      return this.form && this.form.tasks.length > 0;
    },
    fillerName() {
      return this.form.filler_name;
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

