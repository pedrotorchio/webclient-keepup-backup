<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import Route from '@/router/pages/Route';

export default {
  extends: Route,
  name: 'Arquivo',
  components: {
    List
  },
  data: () => ({
    archive: []
  }),
  methods: {
    open(patient) {},
    restore(id) {
      
    }
  },
  computed: {
    ...mapState({
      userData: state => state.patients.patients
    })
  },
  watch: {
    userData: {
      immediate: true,
      deep: true,
      handler(data) {
        if (data)
          this.$store.dispatch('fetchArchivedPatients')
              .then(patients => {
                patients.forEach( patient => {
                  this.archive.push(patient);
                });
              });
      }
    }
  }
}
</script>

<template lang="pug">
div
  list(
      :patients='archive'
      icon='how_to_vote'

      @open='open'
      @action='restore'
    )  
</template>
