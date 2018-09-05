import Vue from 'vue'
import Router from 'vue-router'

import LoginPage from './pages/login'
import DashboardPage from './pages/dashboard'

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
