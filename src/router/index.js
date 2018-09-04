import Vue from 'vue'
import Router from 'vue-router'
import SignUpPage from './pages/SignUpPage.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: "/",
      name: "Landing",
      component: SignUpPage
    },
    {
      path: '/painel',
      name: 'Dashboard',
      component: null
    }
  ]
});
