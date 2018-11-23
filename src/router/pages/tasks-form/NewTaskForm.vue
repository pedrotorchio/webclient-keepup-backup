<script>
export default {
  props: {
    taskOptions: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    shown: false,
    task: {
      title: '',
      start: ''
    }
  }),
  methods: {
    show() {
      this.shown = true
    },
    hide() {
      this.shown = false
    }
  },
  computed: {
    category() {
      if (!this.task.title)
        return "";

      const { category_id } = this.taskOptions.find( opt => opt.title === this.task.title );

      return category_id;
    },
    hourOptions() {
      let hours = [];
      for (let i = 0 ; i < 24 ; i++) {
        const hour = (i+"").padStart(2, 0);
        hours.push(hour);
      }

      return hours;
    },
    minutesOptions() {
      let mins = [];
      for (let i = 0 ; i < 60 ; i += 5) {
        const min = (i+'').padStart(2,0);
        mins.push(min);
      }
      return mins;
    }
  }
}
</script>
<template lang="pug">
  form.secondary(
    :class = `{
      shown
    }`
  )
    button.close-btn(
      @click = "hide"
    ) X
    v-select(
      dark
      v-model = "task.title"
      label = "Selecione a atividade"
      :items = "taskOptions"
      item-text = "title"
      item-value = "title"
      color = "primary"
    )

</template>
<style lang="stylus" scoped>

form

  display flex
  flex-direction column
  justify-content flex-start
  align-items flex-start


  distance = 5px
  shownTop = 80 + 2*distance
  hiddenTop = 100%
  height = "calc(100% - %s)" % (shownTop) 

  position: fixed;
  top hiddenTop
  transition-timing-function: ease-in-out
  transition-delay: 100ms
  transition top 200ms
  // left: distance;
  // right: distance;
  left: 0
  height: height
  width: 100%;
  // width: "calc(100% - %s)" % (2*distance)
  border-top-left-radius: distance;
  border-top-right-radius: distance;

  &.shown
    top: shownTop;

  .close-btn
    color white
    position absolute 
    right 1em
    top 1em
    font-size 12px

  .v-select
    margin: 1em auto;
    width: 80%;
    max-width: 600px;
    min-width 340px

</style>

