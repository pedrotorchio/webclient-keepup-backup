<script>
import SimpleInput from './SimpleInput';

export default {
  extends: SimpleInput,
  props: {
    step:{default: 1}, 
    max:{default: 100}, 
    min:{default: 0},
    type:{
      default: 'number'
    },
    precision:{
      type:Number,
      default: 2
    }
  },
  computed:{
    props(){
      return {
        step: this.step,
        max: this.max,
        min: this.min,
        precision:this.precision
      };
    }
  },
  methods:{
    readTransform(value){
      return value.toFixed(this.precision);
    },
    writeTransform(value){
      return new Big(value);
    }
  },
}
</script>
<template src='./SimpleInput.htm'></template>
<style lang='scss' src='./SimpleInput.scss' scoped></style>