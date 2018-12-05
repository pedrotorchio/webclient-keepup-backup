<script>
import Form from '@/components/generic/form/Form.mixin';
import Caregiver from './Caregiver';

export default {
  name: 'Form',
  extends: Form,
  data: () => ({
    isValid: false,
    caregiver: new Caregiver(),
  }),
  methods: {
    changed(key) {
      
      const { first_name, last_name } = this.caregiver;

      if (first_name && last_name) {
        
        const data = { ...this.caregiver };
        this.$emit('change', data);
      }
    },
  },
}
</script>
<template lang="pug">
v-form(
    v-model='isValid'
  )
    v-text-field( 
      v-model='caregiver.first_name'
      class="input-first_name"
      label='Nome'
      @input="changed('first_name')"
      required
    )
    v-text-field( 
      v-model='caregiver.last_name'
      class="input-last_name"
      label='Nome'
      @input="changed('last_name')"
      required
    )
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl' scoped></style>

<style lang="stylus" scoped>

</style>
