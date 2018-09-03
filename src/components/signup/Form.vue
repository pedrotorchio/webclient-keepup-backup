<script>
export default {
  name: 'signup-form',
  data: () => ({
    email: '',
    password: ''
  })
}
</script>
<template lang="pug">
  form#signup-form.floating.padded
    input(
      v-model='email',
      placeholder='Email'
    )
    input(
      v-model='password',
      placeholder='Senha'
    )
    input(
      v-model='passwordConfirmation',
      placeholder='Repetir a senha'
    )
</template>
<style lang="stylus" scoped>
#signup-form
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: stretch;  
  
  input
    height: 2em;
    margin: .2em 0;
    font-size: 24px;
    text-align: center;
    display: block;
</style>
