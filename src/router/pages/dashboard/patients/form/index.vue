<script>
import { mapState } from 'vuex';

export default {
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
  methods: {
    changed(key) {
      
      const { first_name, last_name } = this.form;
      const data = { ...this.form };

      if (first_name && last_name) {
        this.$emit('change', data);
      }
    }
  },
  computed: {
    ...mapState({
      patients: state => state.patients.patients,
    }),
    patient() {
      let patient = false;
      
      if (this.patientId) {
        patient = this.patients.find(patient => patient.id == this.patientId)
      }

      return patient || false;
    },
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
        if (data.id) {
          this.form = {...this.patient};
        }
      }
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
