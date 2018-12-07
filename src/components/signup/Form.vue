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
      this.$emit('submit', { ...this.formData });
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
      type = "password"
      placeholder='Senha'
    )
    h3#call.link(
      @click='submit'
    ) Acesse o KeepUp

    
</template>
<style lang="stylus" scoped>
#signup-form
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;  

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
    width 100%

  #call
    text-align: center;
    font-size: 24px;
    margin-top: 1em;
    margin-bottom: 0;
</style>
