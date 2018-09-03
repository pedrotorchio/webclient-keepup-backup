<script>
import SignupForm from '@/components/signup/form';

export default {
  components: {
    SignupForm
  },
  data: () => ({
    isLogin: true
  }),
  methods: {
    submitted(data) {
      this.$store.dispatch('signup', data)
          .then(response => {
            console.log('Cadastrado!');
          })
          .catch(error => {
            if (error.status === 400) {
              console.error('Dados inválidos');
            }
          });
    }
  }
}
</script>
<template lang="pug">
  div#signup-page.page
    
    h1#title KeepUp

    div#login-form-wrapper.floating.padded-large(
      :class=`[
        isLogin? 'login' : 'signup'
      ]`
    )
      p#signup-btn
        span.link(
          @click='isLogin=!isLogin'
          v-text="isLogin? 'Cadastrar Usuário' : 'Acessar KeepUp'"
        )

      signup-form#signup-form(
        @submitted='submitted'
        :isLogin='isLogin'
      )
</template>
<style lang="stylus" scoped>
@import '~@/styles/colors.styl';
@import '~@/styles/animations.styl';

#signup-page
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;

#login-form-wrapper
  &.login, &.signup
    animation-name: settling; 
    animation-duration: 1s;
    animation-timing-function: cubic-bezier(.14, .79, 0, 1.01);


#title
  color: orange;
  font-size: 96px;
  margin-top: -2em;
  margin-bottom: 1em;

#signup-form
  width: 400px;
  flex: 0 1 auto;

#signup-btn
  text-align: right;
  height: 1em;
  font-size: 16px;
  margin-bottom: 1em;

</style>
