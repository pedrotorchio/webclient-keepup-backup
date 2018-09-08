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
          path: "/pacientes",
          component: lazyTemplate("dashboard/patients"),
          beforeEnter: requireAuth,
          children: [
            {
              path: "",
              name: "Patient",
              component: lazyTemplate("dashboard/patients/list"),
              props: true,
              meta: {
                title: (route, vm) => 'Pacientes'
              }
            },
            {
              path: ":patientId/:patientName?",
              name: "Patient",
              component: lazyTemplate("dashboard/patients/form"),
              props: true,
              meta: {
                title: (route, vm) => 'Paciente'
              }
            },
          ]
        },

      ]
    }
  ]
});
