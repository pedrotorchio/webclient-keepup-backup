import Vue from 'vue'
import Router from 'vue-router'

import { lazy } from '@/assets/js';
import Patients from './pages/dashboard/patients';
import Dashboard from './pages/dashboard';

Vue.use(Router)

function lazyTemplate(template) {
  return lazy(`router/pages/${template}/index.vue`);
}

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Landing",
      component: lazyTemplate("login")
    },
    {
      path: "/painel",
      component: lazyTemplate("dashboard"),
      children: [
        {
          path: "/pacientes",
          name: "Pacientes",
          component: lazyTemplate("dashboard/patients")
        }
      ]
    }
  ]
});
