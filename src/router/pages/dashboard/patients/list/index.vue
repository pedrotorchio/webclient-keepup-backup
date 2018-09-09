<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  components: {
    List
  },
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
      :patients='patients'
      @open='open'
      @action='remove'
    )

</template>
