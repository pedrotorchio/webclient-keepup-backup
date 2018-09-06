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
      :class="key"
      :label='label'
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
      thumb-label="always"
    )

    v-tooltip( top )
      span Listar pacientes

      v-btn.patients-btn(
        fab dark large
        fixed
        bottom left 
        color="info"
        slot="activator"
        to='/pacientes'
      ) 
        v-icon(
          dark
        ) list

    
      
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
