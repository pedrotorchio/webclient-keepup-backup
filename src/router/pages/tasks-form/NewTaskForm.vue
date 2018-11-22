<script>
export default {
  props: {
    taskOptions: {
      type: Array,
      required: true
    }
  },
  data: () => ({
    shown: false
  }),
  methods: {
    show() {
      this.shown = true
    },
    hide() {
      this.shown = false
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
      label = "Selecione a atividade"
      :items = "taskOptions"
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

</style>

