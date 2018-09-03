<script>
import Big from 'big.js';
import SimpleInput from './SimpleInput';

export default {
  extends: SimpleInput,
  props: {
    value: {
      type: Big,
      required: true
    },
    precision: {
      type: Number,
      default: 2
    },
    min: {
      type: Big,
      required: false
    },
    max: {
      type: Big,
      required: false
    }
  },
  methods:{
    readTransform(value) {
      value = value.toFixed(this.precision);
      return value;
    },
    writeTransform(value){
      value = value.replace(/[.,]/, '');
      if(isNaN(value) || value === false)
        value = 0;
      value = parseInt(value);
      value = value / Math.pow(10,this.precision);
      value = value.toFixed(this.precision);

      return value;
    }
  },
  mounted(){

  }
}
</script>
<template src='./SimpleInput.htm'></template>

<style lang='scss' src='./SimpleInput.scss' scoped></style>
