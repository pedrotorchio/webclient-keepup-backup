<script>
import SimpleInput from "./SimpleInput";
import { TheMask } from 'vue-the-mask';

export default {
  components: {TheMask},
  extends: SimpleInput,
  props: {
    mask: {
      type:String,
      required: true
    },
  },
  computed:{
    _mask(){
      switch(this.mask){
        case 'CPF': 
          return '###.###.###-##';
        break;
        
        default:
          return this.mask;
      }
    }
  },
};
</script>
<template>
  <div class="simple-input">
    <the-mask 
          class="input"
          type='text'
          :required='required' 
          v-model='model'
          :mask="_mask"
          :placeholder="placeholder" 
    ></the-mask>
    <v-icon class="suffix" v-if="validator != null && validateWhen(model)" :color="validationColor" v-text="isValid() ? 'thumb_up' : 'thumb_down'"></v-icon>
    <span v-else-if="suffix" class="suffix" v-text='suffix' ></span>
  </div>
</template>
<style scoped lang='scss' src='./SimpleInput.scss'></style>
