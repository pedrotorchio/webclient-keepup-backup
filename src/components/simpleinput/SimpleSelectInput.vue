<script>
import SimpleInput from './SimpleInput';

export default {
  extends: SimpleInput,
  props: {
    items:{
      type:Array,
      required:true
    },
    type:{
      default: 'select'
    },
  },
  mounted(){
    
  }
}
</script>
<template>
<div class="simple-input">
  <v-select
          :items="items"
          v-model="e1"
          label="Select"
          single-line
          bottom
        ></v-select>
  <v-select class="input" 
    :id='id' 
    :type="type"
    :class='classString'
    :placeholder='placeholder'
    v-model="model">
    <option v-for="item in items" ref='options'
    :key="item.value || item.label" 
    :value="String(item.value || item.label)" 
    :disabled="Boolean(item.disabled)">
      {{ item.label }}
    </option>
  </v-select>
  <v-icon class="suffix" v-if="validator != null && validateWhen(model)" :color="validationColor" v-text="isValid() ? 'thumb_up' : 'thumb_down'"></v-icon>
  <span v-else-if="suffix" class="suffix" v-text='suffix' ></span>
</div>
</template>
<style lang='scss' src='./SimpleInput.scss' scoped></style>