<script>
import NumberInputSpinner from "vue-number-input-spinner";

export default {
  inheritAttrs: false,
  props: ["value", "label", "max", "min"],
  computed: {
    constrainedValue() {
      return this.constraintValue(this.value);
    },
    step() {
      let step = 5;

      if (this.value >= 180) step = 20;
      else if (this.value >= 120) step = 15;
      else if (this.value >= 60) step = 10;

      return step;
    },
    attrs() {
      const { value, label, ...attrs } = this.$attrs;
      return attrs;
    },
    listeners() {
      const { input, change, ...listeners } = this.$listeners;
      return listeners;
    }
  },
  methods: {
    constraintValue(value) {
      return Math.max(Math.min(value, this.max), this.min);
    },
    constraintValueAndEmitEvent(value, eventName) {
      value = this.constraintValue(value);
      this.$emit(eventName, value);
      this.$emit("update:value", value);
    },
    change(value) {
      this.constraintValueAndEmitEvent(value, "change");
    },
    input(value) {
      this.constraintValueAndEmitEvent(value, "input");
    },
    add() {
      this.change(this.value + this.step);
    },
    subtract() {
      this.change(this.value - this.step);
    }
  },
  created() {
    this.input(this.value);
  }
};
</script>
<template lang="pug">
  .spinner-input
    h4( v-if = "label" ) {{ label }}
    .spinner-input-block
      button( @click = "subtract" ) -
      input( type = "number" :value = "constrainedValue" :max = "max" @input = "input" v-bind = "attrs" v-on = "listeners" readonly )
      button( @click = "add" ) +
</template>

<style lang="stylus" scoped>
color = white;

.spinner-input {
  position: relative;
}

.spinner-input-block {
  display: flex;
  flex-direction: row;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: stretch;
  font-size: 24px;
  size = 64px;

  input, button {
    color: color;
    text-align: center;
    outline: none;
    flex: 1 1 size;
    width: size;
    height: size;
  }

  button {
    max-width: 80px;
    min-width: size;
  }

  input {
    min-width: 50px;
  }
}

h4 {
  height: 20px;
  line-height: 20px;
  font-size: 12px;
  top: 0;
  left: 0px;
  right: auto;
  position: absolute;
  color: rgba(255, 255, 255, 0.7);
}
</style>

