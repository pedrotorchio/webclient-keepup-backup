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
    taskOptions: null,
    currentTask: {
      title: '',
      time: '06:00',
      duration: 20,
      independency: 4,
      location: '',
      company: '',
      simultaneous_task: ''
    }
  }),
  methods: {
    ...mapActions({
      fetchForm: 'fetchTasksFormPublicData',
      fetchTaskOptions: 'fetchTaskOptions',
      createTask: 'formCreateTask',
      updateTask: 'formUpdateTask'
    }),
    show() {
      this.$refs.form.show()
    },
    hide() {
      this.$refs.form.hide()
    },
    open(task) {

      // this.currentTask.title = task.title;
      // this.currentTask.time = task.time;
      // this.currentTask.duration = task.duration;
      // this.currentTask.independency = task.independency;
      // this.currentTask.location = task.location;
      // this.currentTask.company = task.company;
      // this.currentTask.simultaneous_task = task.simultaneous_task;

      this.currentTask = task;

      this.show();
    },
    async fetchData() {
      let fetchers = [this.fetchForm(this.formUid), this.fetchTaskOptions(this.formUid)]
      
      const [ form, taskOptions ] = await Promise.all(fetchers);

      this.form = form;
      this.taskOptions = taskOptions;
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
      this.resetDataValues( data => data.currentTask );
      
      delete this.currentTask.created_at
      delete this.currentTask.deleted_at
      delete this.currentTask.updated_at
      delete this.currentTask.id
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

