<script>
import Form from '@/components/generic/form/Form.mixin';
import NewCaregiverForm from '@/components/caregivers/Form';
import CaregiverView from '@/components/caregivers/CaregiverView';

export default {
  name: 'Form',
  extends: Form,
  mixins: [ CaregiverView ],
  components: { NewCaregiverForm },
  constants: {
    REQUIRED_FIELDS: [
      'first_name',
      'last_name'
    ]
  },
  data: () => ({
    isValid: false,
    form: {
      id: null,
      first_name: '',
      last_name: '',

      email: '',
      home_companionship: '',
      occupational_field: '',
      schooling: 0,
      caregivers: []
    },
    updated_at: ''
  }),
  methods: {
    changed(key) {
      if (this.areRequiredFieldsFilled()) {
        
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
      :required="isRequiredField(key)"
      :disabled="isCreation() && !isRequiredField(key)"
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
      :required="isRequiredField('schooling')"
      :disabled="isCreation() && !isRequiredField('schooling')"
      :readonly="false"
    ) 
    div#professionals( v-if = 'model' )
      
      div#caregiver-form-container(
        v-loading = "cgLoading"
      )
        
        h4
          v-btn( 
            @click = "toggleCaregiverFormShown"
            color="primary" 
            fab small dark
          )
            v-icon( v-text = "caregiverFormShown ? 'list' : 'person_add' " )
          | {{ caregiverFormShown ? 'Listar Cuidadores' : 'Adicionar Cuidador' }}
          
        new-caregiver-form( 
          v-if = 'caregiverFormShown'
          @change = 'createCaregiver'
        
        )
        ul( v-else )
          li( 
            v-for = 'caregiver in model.caregivers'
            :id = "`${caregiver.first_name}${caregiver.last_name}`"
          )
            label(
              :for="`${caregiver.first_name}${caregiver.last_name}`"
            ) {{ caregiver.first_name }} {{ caregiver.last_name }}
            v-btn(
              small icon
              color = 'secondary'
              @click = 'deleteCaregiver(caregiver.id)'
            )
              v-icon clear
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl'></style>

<style lang="stylus" scoped>
#professionals
  width 100%
#caregiver-form-container
  width 50%
  margin 0 1em
  h4
    display flex
    justify-content flex-start
    align-items center

  &> ul
    &> li
      margin .5em
      display flex
      justify-content space-between
      align-items center


.slider
  margin: 2em;

.email
  flex-basis: 100%;
.last_name 
  flex-grow: 3;
  flex-basis: 20em;

</style>
