import Vue from 'vue'
import Router from 'vue-router'

import { lazy } from '@/assets/js';
import { requireAuth, anonymousOnly } from './guard';

Vue.use(Router)

function lazyTemplate(template) {
  return lazy(`router/pages/${template}/index.vue`);
}

/**
 * /login
 * /(dashboard)
 *    pacientes [ GET /patients/]
 *      (lista)
 *      arquivo [ GET /patients/archive ]
 *
 *    paciente/{id} [ GET /patients/{id} ]
 *      (edição)
 *      rotinas   [ GET /patients/{id}/routines ]
 *        (lista)
 *      nova-rotina
 *
 *    rotina/{id} [ GET /routines/{id} ]
 *       (edição)
 *        atividades [ GET /routines/{id}/tasks]
 *

 *    paciente/novo
 */

const patients = {
  path: "/pacientes",
  component: lazyTemplate("dashboard/patients"),
  beforeEnter: requireAuth,
  children: [
    {
      path: "",
      name: "PatientsList",
      component: lazyTemplate("dashboard/patients/list"),
      props: true,
      meta: {
        title: (route, vm) => "Pacientes"
      }
    },
    {
      path: "arquivo",
      name: "PatientsArchive",
      component: lazyTemplate("dashboard/patients/archive"),
      props: true,
      meta: {
        title: (route, vm) => "Arquivo de Pacientes"
      }
    }
  ]
};

const patient = {
  path: "/paciente/:patientId(\\d+)",
  component: lazyTemplate("dashboard/patients"),
  beforeEnter: requireAuth,
  children: [
    {
      path: "",
      name: "PatientEdit",
      component: lazyTemplate("dashboard/patients/form"),
      props: (prop) => {
        return {
          patientId: Number(prop.params.patientId)
        }
      },
      meta: {
        title: (route, vm) => "Paciente"
      }
    },
    {
      path: "rotinas",
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
      path: "nova-rotina",
      name: "RoutineNew",
      component: lazyTemplate("dashboard/routines/form"),
      props: (prop) => {
        return {
          patientId: Number(prop.params.patientId)
        }
      },
      meta: {
        title: (route, vm) => "Nova Rotina"
      }
    }
  ]
}
const routine = {
  path: "/rotina/:routineId(\\d+)",
  component: lazyTemplate("dashboard/routines"),
  beforeEnter: requireAuth,
  children: [
    {
      path: '',
      name: "RoutineEdit",
      component: lazyTemplate("dashboard/routines/form"),
      props: (prop) => {
        return {
          routineId: Number(prop.params.routineId)
        }
      },
      meta: {
        title: (route, vm) => "Rotina"
      }
    },
    {
      path: "atividades",
      name: "TasksView",
      component: lazyTemplate("dashboard/routines/view"),
      props: (prop) => {
        return {
          routineId: Number(prop.params.routineId)
        }
      }
    },
    {
      path: "novo-formulario",
      name: "FormNew",
      component: lazyTemplate("dashboard/routines/tasks-form"),
      props: (prop) => {
        return {
          routineId: Number(prop.params.routineId)
        }
      },
      meta: {
        title: (route, vm) => "Novo Formulário de Atividades"
      }
    },
  ]
};
const newPatient = {
  path: "/paciente/novo",
  name: "PatientNew",
  component: lazyTemplate("dashboard/patients/form"),
  props: true,
  meta: {
    title: (route, vm) => "Novo Paciente"
  }
};
const tasksForm = {
  path: "/formulario/:formId(\\d+)",
  name: 'FormEdit',
  component: lazyTemplate("dashboard/routines/tasks-form"),
  beforeEnter: requireAuth,
  props: (prop) => {
    return {
      formId: Number(prop.params.formId)
    }
  },
  meta: {
    title: (route, vm) => "Formulário de Atividades"
  }
};

const tasksFill = {
  path: "/preenchimento/:formUid",
  name: 'TasksForm',
  component: lazyTemplate("tasks-form"),
  props: true
};
const passwordReset = {
  path: "/atualizar-senha",
  name: 'UpdatePassword',
  component: lazyTemplate("password-change"),
  props: true
};

export default new Router({
  mode: "history",
  base: process.env.VUE_APP_BASE_FOLDER,
  routes: [
    {
      path: "/",
      name: "Login",
      component: lazyTemplate("login"),
      beforeEnter: anonymousOnly,
    },
    {
      path: "/",
      component: lazyTemplate("dashboard"),
      children: [
        patients,
        patient,
        routine,
        newPatient,
        tasksForm
      ]
    },
    tasksFill,
    passwordReset
  ]
});
