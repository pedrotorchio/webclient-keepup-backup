<script>
import Page from '../Page';
import SignupForm from '@/components/signup/form';
import { loginProcedure, failedLogin, signupProcedure, failedSignup } from './procedures';
import { TimelineMax } from 'gsap'
export default {
  name: 'LoginPage',
  extends: Page,
  components: {
    SignupForm
  },
  data: () => ({
    isLogin: true,
    
  }),
  methods: {
    async submitProcedure(data) {
      this.isLoading = true;
      
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

      return login;
    },
    submit(data) {
      this.submitProcedure(data)
          .then(login => this.$router.push({ name: 'PatientsList' }))
          .catch(login => this.isLoading = false);
    },
  },
  watch: {
    isLoading(value) {
      new TimelineMax()
        .to('.link', .5, {
          autoAlpha: this.isLoading ? 0 : 1
        })
    }
  }
}
</script>
<template lang="pug" src='./template.pug'></template>
<style lang="stylus" src='./styles.styl'></style>
