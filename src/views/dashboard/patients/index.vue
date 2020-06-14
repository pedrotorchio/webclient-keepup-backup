<script>
import Route from '@/views/Route';
import UserDataWatcher from '@/router/mixins/UserDataWatcher';

export default {
  extends: Route,
  mixins: [ UserDataWatcher ],
  name: 'Patients',
  methods: {
    onUserDataChange(user) {
      this.setGlobalLoading(true)
      if (user.id)
          this.$store.dispatch('fetchAllPatients')
            .then(()=>this.setGlobalLoading(false))
    }
  }
}
</script>
<template lang="pug">
div
  router-view()
</template>
<style lang="stylus" scoped>
.Patients
  .v-list
    display: flex;
    flex-direction: column;
    justify-content: space-between;

  .v-list-tile
    padding-left: 0;
    padding-right: 0;

</style>