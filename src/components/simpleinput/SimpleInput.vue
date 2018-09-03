<script>
import Big from 'big.js';

export default {
  props: {
    id:String, 
    classString:String, 
    required: {
      type:Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default: false
    },
    suffix:String,
    placeholder:String,
    type:{
      type: String,
      default: 'text'
    },
    validator: {
      type: Function,
      default: null
    },
    validateWhen:{
      type:Function,
      default:model=>model.length
    },
    value:{
      required: true
    }
  },
  computed:{
    props(){return {}},
    model:{
      get(){
        return this.readTransform(this.value);
      },
      set(value){
        value = this.writeTransform(value);
        this.$emit('input', value);
        if(this.validator)
          this.$emit('isValid', this.validator(value)); 
      }
    },
    validationColor(){
      return this.isValid() ? 'success' : 'error';
    }
  },
  methods:{
    isValid(){
      // se quiser validar sem transformação inputTransform, aplicar validator a this.value
      if(this.validator)
        return this.validator(this.model);

      return false;
    },
    readTransform(value){
      return value;
    },
    writeTransform(value){
      return value;
    }
  }
}
</script>
<template src='./SimpleInput.htm'></template>
<style lang='scss' src='./SimpleInput.scss' scoped></style>
