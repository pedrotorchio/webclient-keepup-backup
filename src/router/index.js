import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from './pages/LoginPage.vue'
import DashboardPage from './pages/DashboardPage.vue'

Vue.use(Router)

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Landing",
      component: LoginPage
    },
    {
      path: "/painel",
      name: "Dashboard",
      component: DashboardPage
    }
  ]
});
