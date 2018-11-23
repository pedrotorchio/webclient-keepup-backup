<script>
export default {
  props: {
    task: {
      type: Object,
      required: true
    }
  }
}
</script>
<template lang="pug">
  div.task
    div.identification.secondary(
      @click = "$emit('click', task)"
    )
      h2 
        span.task-start {{ task.time }} 
        span.task-title {{ task.title }}
    div.actions
      v-icon clear
</template>
<style lang="stylus" scoped>
  padding = 5px
  .task
    margin padding 0
    margin-top 0
    color white
    width 100%
    display flex
    align-items center
    justify-content space-between
    cursor pointer

    .identification
      padding padding
      height 100%
      max-width 80%
      max-width calc(100% - 50px)

      .task-start
        font-size 10px
      .task-title
        font-size 16px

    .actions
      margin-right 20px


      // [{"start":"06:12","title":"Escovar os Dentes"},{"start":"06:12","title":"Café da Manhã"}]


</style>
