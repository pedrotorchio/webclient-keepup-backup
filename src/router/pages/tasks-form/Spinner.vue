<script>
import NumberInputSpinner from 'vue-number-input-spinner'

export default {
  inheritAttrs: false,
  props: [ 'value', 'label' ],
  computed: {
    attrs() {
      const { label, ...attrs } = this.$attrs;
      return attrs;
    },
    listeners() {
      const { input, ...listeners } = this.$listeners;
      return listeners;
    }
  },
  methods: {
    input(value) {
      this.$emit('input', value);
    }
  },
  components: {
    NumberInputSpinner
  },
}
</script>
<template lang="pug">
  div.spinner-input
    h4( v-if = "label" ) {{ label }}
    number-input-spinner.spinner-input(
      v-bind = "attrs"
      v-on = "listeners"
      :value = 'value'
      @input = 'input'

      inputClass="spinner-value"
      buttonClass="spinner-btn"
    )
</template>

<style lang="stylus" scoped>
color = white
.spinner-input
  display flex
  align-items center
  justify-content space-around
  flex 1 1 100%
  font-size 30px
  position relative

  h4
    height: 20px;
    line-height: 20px;
    font-size 12px
    top 0
    left: 0px;
    right: auto;
    position: absolute;
    color rgba(255,255,255,0.7)
  /deep/
    .spinner-value, .spinner-btn
      color color;
      text-align center
      outline none
    
    .spinner-btn
      width: 40px;
      height: 40px;
      flex: 1 1 40px;

</style>

