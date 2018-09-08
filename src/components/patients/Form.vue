<script>
const formData = () => ({
      first_name: '',
      last_name: '',

      email: '',
      home_companionship: '',
      occupational_field: '',
      schooling: ''
});

export default {
  name: 'Form',
  props: {
    patient: {
      type: Object | Boolean,
      default: false
    }
  },
  data: () => ({
    isValid: false,
    form: formData(),
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
  },
  watch: {
    patient: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data) {
          this.form = {...this.patient};
        } else {
          this.form = formData();
        }
      }
    }
  }
}
</script>
<template lang="pug">
v-form(
    v-model='isValid'
  )
    v-text-field( 
      v-for="([key, label], i) in textFields"
      v-model='form[key]'
      :class="key"
      :label='label'
      @input="changed(key)"
      required
    )
    v-slider(
      class='slider schooling'
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
<style lang="stylus" scoped>
.slider
  margin: 2em;

form
  display: flex;
  flex-wrap: wrap;

.v-input
  flex: 1 1 auto;
  min-width: 10em;

.email
  flex-basis: 100%;
.last_name 
  flex-grow: 3;
  flex-basis: 20em;

</style>
