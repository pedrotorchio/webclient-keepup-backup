<script>
import { mapState } from 'vuex';
import List from '@/components/patients/List';
import Route from '@/router/pages/Route';
import { mapActions } from 'vuex';

export default {
  extends: Route,
  name: 'Arquivo',
  components: {
    List
  },
  data: () => ({
    archive: [],
    rootActions: [
      { tip: 'Lista de Pacientes', to: { name: 'PatientsList' }, color: 'secondary', icon: 'arrow_back' },
    ]
  }),
  methods: {
    ...mapActions([
      'restorePatient'
    ]),
    open(patient) {},
    async restore(id) {
      await this.restorePatient(id)
      
      const i = this.archive.findIndex( p => p.id === id );
      this.archive.splice(i, 1);

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
          this.setGlobalLoading(true)
          this.$store.dispatch('fetchArchivedPatients')
              .then(patients => {
                patients.forEach( patient => {
                  this.archive.push(patient);
                });
              });
          this.setGlobalLoading(false)
          
      }
    }
  }
}
</script>

<template lang="pug">
div
  list(
      :array='archive'
      icon='how_to_vote'

      @open='open'
      @action='restore'
    )  
</template>
