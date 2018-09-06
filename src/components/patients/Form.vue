<script>
export default {
  props: {
    patient: {
      type: Object | Boolean,
      default: false
    }
  },
  data: () => ({
    isValid: false,
    form: {
      first_name: '',
      last_name: '',

      email: '',
      home_companionship: '',
      occupational_field: '',
      schooling: ''
    },
    updated_at: ''
  }),
  computed: {
    textFields() {
      return [
        [ 'first_name', 'Nome'],
        [ 'last_name' , 'Sobrenome'],
        [ 'email' , 'Email'],
        [ 'home_companionship' , 'Companhia em casa'],
        [ 'occupational_field' , 'Ramo de ocupação'],
      ]
    },
    sliderFields() {
      return [
        [ 'schooling' , 'Anos de escolaridade']
      ]
    }
  },
  created() {
    if (this.patient !== false) {
      this.form = {...this.patient};
    }
  }
}
</script>

<style lang="stylus" scoped></style>

<template lang="pug">
  v-form(
    v-model='isValid'
  )
    v-text-field( 
      v-for="([key, label], i) in textFields"
      v-model='form[key]'
      :label='label'
      required
    )
    v-slider(
      class='slider'
      v-model="form['schooling']"
      label="Anos de escolaridade"
      inverse-label
      step="1"
      min="0"
      max="30"
      thumb-label="always"
    )
      
</template>
<style lang="stylus" scoped>
.slider
  margin: 2em;

</style>
