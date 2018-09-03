<script>
import SimpleInput from "./SimpleInput";

export default {
  components: { SimpleInput },
  extends: SimpleInput,
  data() {
    return {
      file: null,
    }
  },
  computed: {
    fileName(){
      return this.model ? this.model.name : '';
    },
    fileType(){
      return this.model ? this.model.type : '';
    },
  },
  methods:{
      isValid(){
      if(!this.validator)
        return true;
      else return this.validator(this.model);
    }
  },
};
</script>
<template>
  <div class="simple-input file-input" >
    <p :style="{color: model? themeColor('secondary') :''}">{{ fileName || placeholder }}</p>
    <p :style="{color: themeColor(validationColor)}">{{fileType}}</p>
    <input type="file" ref="input" @change='model = $refs.input.files[0]'>
  </div>
</template>
<style scoped lang='scss' src='./SimpleInput.scss'></style>
<style scoped lang='scss'>
  .file-input{
    position: relative;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  input{
    cursor: pointer;
    opacity: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    top: 0;
  }
  p{
    text-align: center;
    color: grey;
    margin: 0;
  }
</style>
