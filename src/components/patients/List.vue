<script>
export default {
  props: {
    patients: {
      type: Array,
      required: true
    }
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
<style lang="stylus" scoped>
.v-list
  background: transparent !important;

.v-list-tile:last-child
  margin-bottom: 100px;

</style>

<template lang="pug">
  div
    v-list(
      :style=`{
          height: patients.length * 100 + "px"
        }`
    )
      v-list-tile.padded(
        v-for="(patient, i) in patients"
        :key="i"
        @click.stop="open(patient)"
      )
        v-list-tile-avatar
          img

        v-list-tile-content
          v-list-tile-title {{ patient.first_name }} {{ patient.last_name }}

        v-list-tile-action(
          @click.stop="remove(patient.id)"
        )
          v-icon delete_forever

</template>
