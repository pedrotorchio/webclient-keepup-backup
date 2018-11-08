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
              name: "Patients",
              component: lazyTemplate("dashboard/patients/list"),
              props: true,
              meta: {
                title: (route, vm) => "Pacientes"
              }
            },
            {
              path: "/paciente/:patientId(\\d+)",
              name: "Patient",
              component: lazyTemplate("dashboard/patients/form"),
              props: (prop) => {
                return {
                  patientId: Number(prop.params.patientId)
                }
              },
              meta: {
                title: (route, vm) => "Editar Paciente"
              }
            },
            {
              path: "/paciente/novo",
              name: "NewPatient",
              component: lazyTemplate("dashboard/patients/form"),
              props: true,
              meta: {
                title: (route, vm) => "Novo Paciente"
              }
            },
            {
              path: "arquivo",
              name: "PatientArchive",
              component: lazyTemplate("dashboard/patients/archive"),
              props: true,
              meta: {
                title: (route, vm) => "Arquivo de Pacientes"
              }
            }
          ]
        },
        {
          path: "/rotinas",
          component: lazyTemplate("dashboard/routines"),
          beforeEnter: requireAuth,
          children: [
            {
              path: "paciente/:patientId(\\d+)",
              name: "RoutinesList",
              component: lazyTemplate("dashboard/routines/list"),
              props: (prop) => {
                return {
                  patientId: Number(prop.params.patientId)
                }
              },
              meta: {
                title: (route, vm) => "Rotinas"
              }
            },
            {
              path: "paciente/:patientId(\\d+)/nova",
              name: "RoutinesNew",
              component: lazyTemplate("dashboard/routines/form"),
              props: (prop) => {
                return {
                  patientId: Number(prop.params.patientId)
                }
              },
              meta: {
                title: (route, vm) => "Nova Rotina"
              }
            },
            {
              path: "/rotina/:routineId(\\d+)",
              name: "RoutinesUpdate",
              component: lazyTemplate("dashboard/routines/form"),
              props: (prop) => {
                return {
                  routineId: Number(prop.params.routineId)
                }
              },
              meta: {
                title: (route, vm) => "Editar Rotina"
              }
            },
            {
              path: "/rotina/:routineId(\\d+)/atividades",
              name: "TaskView",
              component: lazyTemplate("dashboard/routines/view"),
              props: (prop) => {
                return {
                  routineId: Number(prop.params.routineId)
                }
              },
              meta: {
                title: (route, vm) => "Visualizar Rotina"
              }
            },

          ]
        }
      ]
    }
  ]
});
