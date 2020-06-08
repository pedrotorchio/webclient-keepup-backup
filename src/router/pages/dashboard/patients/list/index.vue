<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import Route from '@/router/pages/Route';

export default {
  name: 'Patients-List',
  extends: Route,
  components: {
    List
  },
  data: () => ({
    rootActions: [
      { tip: 'Novo Paciente', to: { name: 'PatientNew' }, color: 'primary', icon: 'add' },
      { tip: 'Pacientes Arquivados', to: { name: 'PatientsArchive' }, color: 'secondary', icon: 'inbox' },
    ],
  }),
  computed: {
    ...mapState({
      patients: state => state.patients.patients
    })
  },
  methods: {
    open(patient) {
      let { first_name, last_name, id } = patient;

      this.$router.push({
        name: 'PatientEdit',
        params: {
          patientId: id
        }
      });
    },
    openRoutine(patient) {
      alert(patient);
    },
    remove(id) {
      this.$store.dispatch('deletePatient', id);
    },
    openRoutine(id) {
      this.$router.push({
        name: 'RoutinesList',
        params: {
          patientId: id
        }
      });
    }
  }
}
</script>

<template lang="pug">
  div
    h4.text-center( v-if = "patients.length === 0") Nenhum paciente cadastrado. Clique em 
      v-btn(
        small icon
        :to = "{ name: 'PatientNew' }"
        color = "primary"
      ) 
        v-icon add
    list(
      v-else
      :array='patients'
      @open='open'
      @action='remove'
      @openRoutine = 'openRoutine'
    )

</template>
