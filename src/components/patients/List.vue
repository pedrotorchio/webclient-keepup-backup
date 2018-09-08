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
      this.$emit('open', patient);
    },
    remove(id) {
      this.$emit('remove', id);
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
        v-icon move_to_inbox

</template>
