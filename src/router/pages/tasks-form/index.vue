<script>
import TasksFormRoute from '@/router/mixins/TasksFormRoute';
import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';
import Task from './Task';

export default {
  extends: Route,
  components: { Task },
  // mixins: [ TasksFormRoute ],
  props: {
    formUid: {}
  },
  data: () => ({
    form: null
  }),
  methods: {
    ...mapActions({
      fetchForm: 'fetchTasksFormPublicData'
    }),
    async fetchData() {
      this.form = await this.fetchForm(this.formUid);
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

