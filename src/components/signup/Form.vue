<script>
export default {
  name: 'signup-form',
  props: {
    isLogin: {
      type: Boolean,
      default: true
    }
  },
  data: () => ({
    formData: {
      email: '',
      password: '',
      name: ''
    }
  }),
  methods: {
    submit() {
      this.$emit('submitted', { ...this.formData });
    }
  }
}
</script>
<template lang="pug">
  form#signup-form
    input(
      v-model='formData.name',
      placeholder='Apelido'
      v-if='!isLogin'
    )
    input(
      v-model='formData.email',
      placeholder='Email'
    )
    input(
      v-model='formData.password',
      placeholder='Senha'
    )
    button(
      @click='submit'
      v-text="isLogin? 'Entrar' : 'Cadastrar'"
    )
</template>
<style lang="stylus" scoped>
#signup-form
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;  

  input, button
    height: 2em;
    margin: .2em 0;
    font-size: 24px;
    text-align: center;
    display: block;
    background: transparent;
    border: none;
    border-bottom: 1px solid lightgrey;
    outline: none;

</style>
