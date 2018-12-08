<script>
import Form from '@/components/generic/form/Form.mixin';

export default {
  name: 'Form',
  extends: Form,
  data: () => ({
    isValid: false,
    form: {
      first_name: '',
      last_name: '',

      email: '',
      home_companionship: '',
      occupational_field: '',
      schooling: 0
    },
    updated_at: ''
  }),
  methods: {
    changed(key) {
      
      const { first_name, last_name } = this.form;

      if (first_name && last_name) {
        
        const data = { ...this.form };
        this.$emit('change', data);
      }
    },
  },
  computed: {
    textFields() {
      return [
        [ 'first_name', 'Nome'],
        [ 'last_name' , 'Sobrenome'],
        [ 'home_companionship' , 'Companhia em casa'],
        [ 'occupational_field' , 'Ramo de ocupação'],
        [ 'email' , 'Email'],
      ]
    },
    sliderFields() {
      return [
        [ 'schooling' , 'Anos de escolaridade']
      ]
    }
  }
}
</script>
<template lang="pug">
v-form.ku-form(
    v-model='isValid'
  )
    v-text-field( 
      v-for="([key, label], i) in textFields"
      v-model='form[key]'
      :class="`input-${key}`"
      :label='label'
      @input="changed(key)"
      required
    )
    v-slider(
      class='slider input-schooling'
      v-model="form['schooling']"
      label="Anos de escolaridade"
      inverse-label
      step="1"
      min="0"
      max="30"
      @input="changed('schooling')"
      thumb-label="always"
    )  
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl'></style>

<style lang="stylus" scoped>
.slider
  margin: 2em;

.email
  flex-basis: 100%;
.last_name 
  flex-grow: 3;
  flex-basis: 20em;

</style>
