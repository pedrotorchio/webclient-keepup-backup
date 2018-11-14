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
          .then(login => this.$router.push({ name: 'PatientsList' }))
          .catch(login => null);
    }

  }
}
</script>
<template lang="pug" src='./template.pug'></template>
<style lang="stylus" src='./styles.styl' scoped></style>
