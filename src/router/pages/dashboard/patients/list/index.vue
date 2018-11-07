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
      { tip: 'Novo Paciente', to: '/pacientes/novo', color: 'primary', icon: 'add' },
      { tip: 'Pacientes Arquivados', to: '/pacientes/arquivo', color: 'secondary', icon: 'inbox' },
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
          last_name = last_name.split(' ').join('-');

      let name = `${first_name} ${last_name}`;
          name = name.replace(' ', '-');

      this.$router.push(`/pacientes/${id}/${name}`);
    },
    remove(id) {
      this.$store.dispatch('deletePatient', id);
    }
  }
}
</script>

<template lang="pug">
  div
    list(
      :array='patients'
      @open='open'
      @action='remove'
    )

</template>
