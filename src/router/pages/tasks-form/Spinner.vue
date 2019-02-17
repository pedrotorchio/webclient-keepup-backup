<script>
import NumberInputSpinner from 'vue-number-input-spinner'

export default {
  inheritAttrs: false,
  props: [ 'value', 'label' ],
  computed: {
    step() {
      let step = 5

      if (this.value >= 120)
        step = 30
      if (this.value >= 60)
        step = 20
      if (this.value >= 30)
        step = 15
      return step
    },
    attrs() {
      const {value, label, ...attrs} = this.$attrs;
      return attrs;
    },
    listeners() {
      const { input, change, ...listeners } = this.$listeners;
      return listeners;
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
      this.$emit('change', value);
    },
    add() {
      this.input(this.value + this.step)
    },
    subtract() {
      this.input(this.value - this.step)
    }
  }
}
</script>
<template lang="pug">
  .spinner-input
    h4( v-if = "label" ) {{ label }}
    .spinner-input-block
      button( @click = "subtract" ) -
      input( type = "number" :value = "value" @input = "input" v-bind = "attrs" v-on = "listeners" readonly )
      button( @click = "add" ) +
</template>

<style lang="stylus" scoped>
color = white

.spinner-input
  position: relative

.spinner-input-block
  display: flex
  flex-direction: row
  flex-wrap: nowrap
  justify-content center
  align-items: stretch
  font-size: 24px
  
  size = 64px
  input, button
    color color;
    text-align center
    outline none
    flex: 1 1 size
    width: size;
    height: size;
  
    
  button
    max-width: 80px
    min-width: size
  input
    min-width: 50px
  
    
h4
  height: 20px;
  line-height: 20px;
  font-size 12px
  top 0
  left: 0px;
  right: auto;
  position: absolute;
  color rgba(255,255,255,0.7)

// .spinner-input
//   display flex
//   align-items center
//   justify-content space-around
//   flex 1 1 100%
//   font-size 30px
//   position relative

//   /deep/


</style>

