import Vue from 'vue'
import Router from 'vue-router'

import { lazy } from '@/assets/js';
import { requireAuth } from './guard';

Vue.use(Router)

function lazyTemplate(template) {
  return lazy(`router/pages/${template}/index.vue`);
}

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      name: "Login",
      component: lazyTemplate("login")
    },
    {
      path: "/painel",
      component: lazyTemplate("dashboard"),
      children: [
        {
          path: "/pacientes/:patientId?/:patientName?",
          name: "Patients",
          component: lazyTemplate("dashboard/patients"),
          props: true,
          beforeEnter: requireAuth,
          meta: {
            title: (route, vm) => route.params.patientId ? 'Paciente' : 'Pacientes'
          }
        }
      ]
    }
  ]
});
