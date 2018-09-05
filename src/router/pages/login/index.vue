<script>
import Page from '../Page';
import SignupForm from '@/components/signup/form';
import { loginProcedure, failedLogin, signupProcedure, failedSignup } from './procedures';

export default {
  name: 'LoginPage',
  extends: Page,
  components: {
    SignupForm
  },
  data: () => ({
    isLogin: true,
    loading: false
  }),
  methods: {
    async submitProcedure(data) {
      this.loading = true;
      
      let shouldLogin = true;
      let login = null;

      if (!this.isLogin) {
        shouldLogin = await signupProcedure.bind(this)(data)
          .catch(failedSignup.bind(this));
      }

      if (shouldLogin) {
        login = await loginProcedure.bind(this)(data)
          .catch(failedLogin.bind(this));
      }
      
      this.loading = false;

      login = Boolean(login);
      
      if (!login) 
        throw false;

      return login;
    },
    submit(data) {
      this.submitProcedure(data)
          .then(login => this.$router.push({ name: 'Dashboard' }))
          .catch(login => null);
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
          v-if='!loading'
        )

      signup-form#signup-form(
        @submit='submit'
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

#signup-btn, #call
  text-align: right;
  height: 1em;
  font-size: 16px;
  margin-bottom: 1em;

</style>
