<script>

export default {
  name: 'signup-form',
  props: {
    type: {
      type: String,
      default: 'login'
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
    isType(t) {
      return this.type === t;
    },
    isNotType(t) {
      return this.type !== t;
    },
    submit(captcha) {
      this.resetCaptcha();
      this.$emit('submit', { ...this.formData, captcha });
    },
    lazyValidation() {
      // this.$refs.recaptcha.execute();
    },
    resetCaptcha() {
      // this.$refs.recaptcha.reset();
    }
  }
}
</script>
<template lang="pug">
  form#signup-form( @submit.prevent="submit" )
    p.tip( v-if="isType('reset')" ) Preencha com o email que você usa para acessar o KeepUp. Se a conta realmente existir, você receberá um link para alterar a senha.
    input(
      v-model='formData.name',
      placeholder='Nome'
      v-if="isType('signup')"
    )
    input(
      v-model='formData.email',
      placeholder='Email'
    )
    input(
      v-if="isNotType('reset')"
      v-model='formData.password',
      type = "password"
      placeholder='Senha'
    )
    button.link.no-border.call-to-action {{ isType('reset') ? 'Enviar email' : 'Acesse o KeepUp' }}


</template>
<style lang="stylus" scoped>
#signup-form
  display: flex;
  flex-direction: column;
  align-items: stretch;
  justify-content: flex-start;
</style>
