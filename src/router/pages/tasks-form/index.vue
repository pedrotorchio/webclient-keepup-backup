<script>
import TasksFormRoute from '@/router/mixins/TasksFormRoute';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  mixins: [ TasksFormRoute ],
  props: {
    formUid: {
      type: Number
    }
  }
}
</script>
<template lang="pug" src="./template.pug"></template>
<style lang="stylus" src="./styles.styl" scoped></style>

