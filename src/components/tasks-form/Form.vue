<script>
import Form from '@/components/generic/form/Form.mixin';

export default {
  name: 'New-Form',
  extends: Form,
  data: () => ({
    isValid: false,
    form: {
      filler: '',
      comment: '',
    },
    updated_at: '',
  }),
  methods: {
    changed(key) { 
      const { filler } = this.form;

      if (filler) {

        const data = { ...this.form };
        this.$emit('change', data);
      }
    },
  },
  computed: {
    textFields() {
      return [
        [ 'filler' , 'Preenchedor*', true],
        [ 'comment' , 'Comentário'],
      ]
    },
  }
}
</script>
<template lang="pug">
v-form(
    v-model='isValid'
  )        
  v-text-field( 
    v-for="([key, label, isRequired], i) in textFields"
    v-model='form[key]'
    :class="`input-${key}`"
    class="input"
    :label='label'
    @input="changed(key)"
    :required = 'isRequired'
  )
</template>
<style lang="stylus" src='@/components/generic/form/styles.styl' scoped></style>

<style lang="stylus" scoped>

.input
  width: 100%;
.input-title
  font-weight: bold;


</style>
