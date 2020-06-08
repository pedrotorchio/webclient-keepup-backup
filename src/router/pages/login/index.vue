<script>
import Page from '../Page';
import SignupForm from '@/components/signup/Form';
import { loginProcedure, failedLogin, signupProcedure, failedSignup, resetProcedure } from './procedures';
import { TimelineMax } from 'gsap'
export default {
  name: 'LoginPage',
  extends: Page,
  components: {
    SignupForm
  },
  data: () => ({
    tabSelected: 'login',
  }),
  computed: {
    topToggleText() {
      if (this.tabSelected === 'signup') return 'Cadastrar Usuário';
      return 'Acessar KeepUp';
    }
  },
  methods: {
    resetPassword() {
      this.tabSelected = 'reset';
    },
    async submitProcedure(data) {
      this.isLoading = true;

      let shouldLogin = false;
      let login = null;
      if (this.tabSelected === 'signup') {
        shouldLogin = await signupProcedure.bind(this)(data)
      }
      if (this.tabSelected === 'login' || shouldLogin) {
        login = await loginProcedure.bind(this)(data)
      }
      if (this.tabSelected === 'reset') {
        await resetProcedure.bind(this)(data);
      }

      if(!login) throw 'No login done';
      return login;
    },
    toggleLoginSignup() {
      if (this.tabSelected === 'login') return this.tabSelected = 'signup';
      if (this.tabSelected === 'signup') return this.tabSelected = 'login';
      this.tabSelected = 'login';
    },
    submit(data) {
      this.submitProcedure(data)
          .then(login => this.$router.push({ name: 'PatientsList' }))
          .catch(e => {
            console.log(e);
            this.isLoading = false
          });
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
