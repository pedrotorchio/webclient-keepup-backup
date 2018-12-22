<script>
import Recaptcha from 'vue-recaptcha';

export default {
  name: 'signup-form',
  components: { Recaptcha },
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
    submit(captcha) {
      this.resetCaptcha();
      this.$emit('submit', { ...this.formData, captcha });
    },
    lazyValidation() {
      this.$refs.recaptcha.execute();
    },
    resetCaptcha() {
      this.$refs.recaptcha.reset();
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
    recaptcha( ref = "recaptcha" sitekey = "6LdXPYQUAAAAANQOh_W1tC-D9Qei1dJy8T1aMyQ4" 
      @verify = "submit" 
      @expired = "resetCaptcha"
    )
      button#call.link Acesse o KeepUp

    
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

  button
    border-bottom none
    
  #call
    text-align: center;
    font-size: 24px;
    margin-top: 1em;
    margin-bottom: 0;
</style>
