import Vue from 'vue'
import Router from 'vue-router'
import SignUpPage from './pages/SignUpPage.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: "/",
      name: "Cadastro",
      component: SignUpPage
    }
  ]
});
